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

export const getAddresses = async () => {
    try {
        const response = await apiFetch(
            apiEndpoints.addresses,
            {
                method: "GET",
            }
        );
        if (!response.ok) {
            throw new Error("Error server: ", response.status);
        }
        return response.json();
    } catch (error) {
        console.error("Error fetch addresses: ", error);
        throw error;
    }
}

export const updateAddress = async (id, updateData) => {
    try {
        const response = await apiFetch(
            `${apiEndpoints.addresses}/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateData),
            }
        );
        if (!response.ok) {
            throw new Error("Error server: ", response.status);
        }
        return response.json();
    } catch (error) {
        console.error("Error update addresses: ", error);
        throw error;
    }
}

export const deleteAddress = async (id) => {
    try {
        const response = await apiFetch(
            `${apiEndpoints.addresses}/${id}`,
            {
                method: "DELETE",
            }
        );
        if (!response.ok) {
            throw new Error("Error server: ", response.status);
        }
        return response.json();
    } catch (error) {
        console.error("Error delete address: ", error);
        throw error;
    }
}
