import { apiFetch } from "../api/apiFetch";
import apiEndpoints from "../config/apiRouters";

export const getProductCardInfoProducts = async () => {
    try {
        const response = await apiFetch(
            apiEndpoints.products,
            {
                method: "GET",
            }
        )
        if (!response.ok) {
            throw new Error("Error server", response.status);
        }
        return response.json();
    } catch (error) {
        console.log("Error fetching product", error);
        throw error;
    }
}

export const getProductDetails = async (idQuery) => {
    try {
        const response = await apiFetch(
            apiEndpoints.getProductDetails(idQuery),
            {
                method: "GET",
            }
        )
        if (!response.ok) {
            throw new Error("Error server 1");
        }
        return response.json();
    } catch (error) {
        console.log("Error fetching product details at service", error);
        throw error;
    }
}