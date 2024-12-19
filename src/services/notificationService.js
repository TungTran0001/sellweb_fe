import { apiFetch } from "../api/apiFetch";

export const getNotifications = async () => {
    try {
        const response = await apiFetch(
            "http://localhost:3001/api/v1/notifications", 
            { method: "GET", headers: { "Content-Type": "application/json" } }
        );
        if (!response.ok) {
            throw new Error("Failed to fetch notifications");
        }
        return response.json(); // Return the data
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
}