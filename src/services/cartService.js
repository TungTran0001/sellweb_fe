import { apiFetch } from "../api/apiFetch";
import apiEndpoints from "../config/apiRouters";

export const addToCart = async (formData) => {
    try {
        const response = await apiFetch(
            apiEndpoints.carts,
            {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                },
            }
        );
        if (!response.ok) {
            throw new Error("Error create cart");
        }
        return response.json();
    } catch (error) {
        console.log("Error at catch service file", error);
    }
}