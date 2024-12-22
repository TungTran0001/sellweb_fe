import { apiFetch } from "../api/apiFetch";

export const getUserHeaderInfo = async () => {
    try {
        const response = await apiFetch(
            "http://localhost:3001/api/v1/users/me",
            { method: "GET" }
        )
        if (!response.ok) {
            throw new Error("Failed to fetch headerInfo");
        }
        return response.json();
    } catch (error) {
        console.error("failed 1: ", error);
        throw error;
    }
}