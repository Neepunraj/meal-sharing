"use client"
import { UserContextProvider } from "@/context/usercontext";
import "./globals.css";
import { MealContextProvider } from "@/context/mealContext";
import { ReservationContextProvider } from "@/context/reservationContext";
/* 
export const metadata = {
  title: "HackYourFuture"
}; */

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserContextProvider>
          <MealContextProvider>
            <ReservationContextProvider>
              {children}
            </ReservationContextProvider>
          </MealContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
