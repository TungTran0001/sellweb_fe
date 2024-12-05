import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { refreshAccessToken } from "../services/authService";


export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true) // Trạng thái tải ban đầu

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const accessToken = Cookies.get("accessToken");
                const refreshToken = Cookies.get("refreshToken");
                if (!accessToken) {
                    if (!refreshToken) {
                        setIsAuthenticated(false);
                    } else {
                        const newAccessToken = await refreshAccessToken();
                        if (newAccessToken) {
                            setIsAuthenticated(true);
                        } else {
                            setIsAuthenticated(false);
                        }
                    }
                } else {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Error checking authentication: ", error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        }

        // Kiểm tra trạng thái xác thực khi component được mount
        checkAuthStatus();

        // Làm mới accessToken mỗi 5 phút (300,000ms)
        const intervalId = setInterval(
            async () => {
                try {
                    const newAccessToken = await refreshAccessToken();
                    if (newAccessToken) {
                        console.log("Access token refreshed successfully!");
                    } else {
                        console.warn("Failed to refresh access token.");
                        setIsAuthenticated(false); // Nếu không làm mới được, hủy xác thực
                    }
                } catch (error) {
                    console.error("Error refreshing access token:", error);
                    setIsAuthenticated(false);
                }
            },
            300000 // 5 phút
        );
        // Dọn dẹp interval khi component bị unmount
        return () => clearInterval(intervalId);

    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, setIsAuthenticated }}>
            {!isLoading ? children : <div>Loading...</div>} {/* Hiển thị loader khi đang kiểm tra */}
        </AuthContext.Provider>
    )
}