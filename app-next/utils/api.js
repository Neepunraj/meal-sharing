export const API_BASE_URL = "http://localhost:8000";
export const API_ROUTES = {
    AUTH: `${API_BASE_URL}/api/auth`,
    MEAL: `${API_BASE_URL}/api/meals`,
    RESERVATIONS: `${API_BASE_URL}/api/reservations`,

};

export default function api(route) {
    return `${process.env.NEXT_PUBLIC_API_URL}/api${route}`;
}
