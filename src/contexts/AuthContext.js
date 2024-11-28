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
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, setIsAuthenticated }}>
            {!isLoading ? children : <div>Loading...</div>} {/* Hiển thị loader khi đang kiểm tra */}
        </AuthContext.Provider>
    )
}