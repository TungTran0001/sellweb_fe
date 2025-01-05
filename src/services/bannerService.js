import { apiFetch } from "../api/apiFetch";
import apiEndpoints from "../config/apiRouters";

export const getHomePageBanners = async () => {
    try {
        const response = await apiFetch(
            apiEndpoints.getHomePageBanners,
            {
                method: "GET",
            }
        )
        if (!response.ok) {
            throw new Error("Error server", response.status);
        }
        return response.json();
    } catch (error) {
        console.log("Error fetching homepage banner", error);
        throw error;
    }
}