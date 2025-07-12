import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Public routes that don't require auth
const publicRoutes = ["/", "/auth", "/meal"];

// Routes only SUPER_ADMIN should access
const superAdminRoutes = ["/admin"];

// Routes only regular users should access
const userRoutes = ["/home"];

export async function middleware(request) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const { pathname } = request.nextUrl;

    // Function to check if current path matches a public route
    const isPublicRoute = publicRoutes.some(
        (route) => pathname === route || pathname.startsWith(route + "/")
    );

    // If user has access token
    if (accessToken) {
        try {
            const { payload } = await jwtVerify(
                accessToken,
                new TextEncoder().encode(process.env.JWT_SECRET)
            );
            const { role } = payload

            // Prevent logged-in users from visiting public pages
            if (isPublicRoute) {
                return NextResponse.redirect(
                    new URL(
                        role === "ADMIN" ? "/admin" : "/meal",
                        request.url
                    )
                );
            }

            // Prevent normal users from accessing super admin pages
            if (
                role !== "ADMIN" &&
                superAdminRoutes.some((route) => pathname.startsWith(route))
            ) {
                return NextResponse.redirect(new URL("/home", request.url));
            }

            // Prevent SUPER_ADMIN from accessing user-only pages
            if (
                role === "ADMIN" &&
                userRoutes.some((route) => pathname.startsWith(route))
            ) {
                return NextResponse.redirect(new URL("/super-admin", request.url));
            }

            return NextResponse.next();
        } catch (error) {
            console.error("Access token invalid or expired:", error);

            // Try to refresh token
            const refreshResponse = await fetch(
                "https://localhost:8000/api/auth/refresh-token",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        cookie: request.headers.get("cookie") || "",
                    },
                }
            );

            if (refreshResponse.ok) {
                const newAccessToken = refreshResponse.headers.get("Set-Cookie");
                const response = NextResponse.next();
                if (newAccessToken) {
                    response.headers.set("Set-Cookie", newAccessToken);
                }
                return response;
            } else {
                const response = NextResponse.redirect(
                    new URL("/auth/login", request.url)
                );
                response.cookies.delete("accessToken");
                response.cookies.delete("refreshToken");
                return response;
            }
        }
    }

    // If no access token and not visiting a public route, redirect to login
    if (!isPublicRoute) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
