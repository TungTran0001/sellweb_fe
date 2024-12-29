import { apiFetch } from "../api/apiFetch";
import apiEndpoints from "../config/apiRouters";

export const createAddress = async (formData) => {
    try {
        const response = await apiFetch(
            apiEndpoints.addresses,
            {
                method: 'POST', 
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                },
            }
        )
        if (!response.ok) {
            throw new Error("Error create address 2");
        }
        return response.json();
    } catch (error) {
        console.error("Error create address: ", error);
        throw error;
    }
}