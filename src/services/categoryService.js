import { apiFetch } from "../api/apiFetch"
import apiEndpoints from "../config/apiRouters"

export const getNameImageIdQueryCategory = async () => {
    try {  
        const response = await apiFetch(
            apiEndpoints.categories,
            {
                method: "GET",
            }
        )
        if (!response.ok) {
            throw new Error("Error server", response.status);
        }
        return response.json();
    } catch (error) {
        console.log("Error fetching category", error);
        throw error;
    }
}