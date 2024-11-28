import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const GuestRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    // Nếu người dùng đã đăng nhập, chuyển hướng đến trang chủ
    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    // Nếu chưa đăng nhập, hiển thị nội dung bên trong
    return children;
}

export default GuestRoute;