import { apiFetch } from "../api/apiFetch";

export const getProfile = async () => {
    try {
        const response = await apiFetch(
            "http://localhost:3001/api/v1/profiles", 
            { method: "GET", headers: { "Content-Type": "application/json" }}
        );
        if (!response.ok) {
            throw new Error("Failed to fetch profile");
        }
        return response.json(); // Return the data
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
}

export const updateProfile = async (formData) => {
    try {
        const response = await apiFetch(
            "http://localhost:3001/api/v1/profiles/update", 
            { method: "PUT", body: formData }
            );
        if (!response.ok) {
            throw new Error("Failed update profile 1");
        }
        return response.json(); // Return the data
    } catch (error) {
        console.error("Error update profile:", error);
        throw error;
    }
}