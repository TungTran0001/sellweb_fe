import Cookies from "js-cookie";
import { refreshAccessToken } from "../services/authService";

export const apiFetch = async (url, options = {}) => {
    try {
        // Lấy accessToken từ cookie
        let accessToken = Cookies.get("accessToken");
        // Thực hiện yêu cầu ban đầu với accessToken hiện tại
        let response = await fetch(
            url,
            {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                }
            }
        );
        // Nếu server trả về mã lỗi 401 (Unauthorized) -> accessToken có thể đã hết hạn
        if (response.status === 401) {
            try {
                // Gọi hàm làm mới token để lấy accessToken mới từ refreshToken
                accessToken = await refreshAccessToken();
                // Lưu accessToken mới vào cookie với thời hạn là 1 giờ (0.04 ngày ~ 1 giờ)
                Cookies.set("accessToken", accessToken, { expires: 0.04 });
                // Thực hiện lại yêu cầu ban đầu với accessToken mới
                response = await fetch(url, {
                    ...options,
                    headers: {
                        ...options.headers,
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });
            } catch (refreshError) {
                // Nếu có lỗi trong quá trình làm mới token, ghi log lỗi và ném lỗi ra ngoài
                console.error("Failed to refresh token:", refreshError);
                throw refreshError;
            }
        }
        // Trả về response sau khi thực hiện yêu cầu
        return response;
    } catch (error) {
        // Nếu có lỗi trong quá trình thực hiện API, ghi log lỗi và ném lỗi ra ngoài
        console.error("API request failed:", error);
        throw error;
    }
}