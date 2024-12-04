import Cookies from "js-cookie";

export const registerUser = async (userData) => {
    try {
        const response = await fetch(
            "http://localhost:3001/api/v1/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        );
        if (!response.ok) {
            const errorText = await response.json();
            throw new Error(errorText.message || "Registration failed");
        }
        const data = await response.json();
        return data
    } catch (error) {
        throw error;
    }
}

export const loginUser = async (formValues) => {
    try {
        const response = await fetch(
            "http://localhost:3001/api/v1/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formValues),
            }
        );
        if (!response.ok) {
            const errorText = await response.json();
            throw new Error(errorText.message || "Login failed");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const logoutUser = async () => {
    try {
        const response = await fetch(
            "http://localhost:3001/api/v1/auth/logout",
            {
                method: "POST",
                credentials: "include", // Để gửi cookie chứa refreshToken
            }
        );
        if (!response.ok) {
            throw new Error("Logout failed on the server.");
        }
        // Xóa cookie chứa accessToken và refreshToken
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        return true; // Trả về trạng thái thành công
    } catch (error) {
        console.error("Error during logout:", error);
        throw error; // Truyền lỗi lên để xử lý ở phía gọi hàm
    }
}

export const refreshAccessToken = async () => {
    try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
            throw new Error("No refresh token available");
        }
        const response = await fetch("http://localhost:3001/api/v1/auth/refresh-token", {
            method: "POST",
            credentials: "include", // Đảm bảo cookie được gửi kèm request
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to refresh access token.");
        }
        const data = await response.json(); // Chuyển json thành object
        Cookies.set("accessToken", data.accessToken, { expires: 0.01 }); // 15 phút
        return data.accessToken; // Trả về accessToken mới
    } catch (error) {
        console.error("Error refreshing access token:", error);
        return null; // Không lấy được token
    }
}