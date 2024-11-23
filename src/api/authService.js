import Cookies from "js-cookie";

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