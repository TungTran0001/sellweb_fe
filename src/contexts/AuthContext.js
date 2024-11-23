import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { refreshAccessToken } from "../api/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = Cookies.get("accessToken");
            if (!accessToken) {
                const newAccessToken = await refreshAccessToken();
                Cookies.set(newAccessToken);
                setIsAuthenticated(!!newAccessToken);
            } else {
                setIsAuthenticated(true);
            }
        }
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}