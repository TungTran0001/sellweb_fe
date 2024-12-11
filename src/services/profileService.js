import { apiFetch } from "../api/apiFetch";

export const getProfile = async () => {
    try {
        const response = await apiFetch("http://localhost:3001/api/v1/profile", { method: "GET"});
        if (!response.ok) {
            throw new Error("Failed to fetch profile");
        }
        return response.json(); // Return the data
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
}