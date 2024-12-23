import NotificationLink from "./notifications/NotificationLink";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { logoutUser } from "../services/authService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getNotifications } from "../services/notificationService";
import { Link } from "react-router-dom";
import { getUserHeaderInfo } from "../services/userService";

export const HeaderTop = () => {
    const { setIsAuthenticated } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]); // Trạng thái lưu danh sách thông báo
    const [userInfo, setUserInfo] = useState({ avatar_url: '', displayName: '' });

    // Lấy danh sách thông báo khi component được render
    useEffect(
        () => {
            const fetchNotifications = async () => {
                try {
                    const response = await getNotifications(); // Gọi API để lấy thông báo
                    setNotifications(response.data);
                } catch (error) {
                    console.error("Failed to fetch notifications:", error.message);
                }
            }
            fetchNotifications();
        },
        [] // [] đảm bảo chỉ gọi 1 lần khi component được render
    );

    useEffect(
        () => {
            const fetchHeaderInfo = async () => {
                try {
                    const data = await getUserHeaderInfo(); // Gọi API để lấy 
                    setUserInfo(data);
                } catch (error) {
                    console.error("failed 2: ", error);
                }
            }
            fetchHeaderInfo();
        },
        [] // [] đảm bảo chỉ gọi 1 lần khi component được render
    )

    const handleLogout = async () => {
        try {
            // Gọi hàm logout từ authService
            await logoutUser();
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Logout failed:", error.message);
            alert(error.message);
        }
    }

    return (
        <div className="row mb-3 py-2">
            <div className="col d-flex justify-content-start">
                <a href="/#" className="text-light link-underline-primary mx-2">Kênh người bán</a>
                <a href="/#" className="text-light link-underline-primary mx-2">Tải ứng dụng</a>
                <a href="/#" className="text-light link-underline-primary mx-2">Kết nối</a>
            </div>
            <div className="col d-flex justify-content-end">
                <div className="dropdown">
                    <a href="/#" className="text-light mx-2 link-underline-primary dropdown-toggle" data-bs-toggle="dropdown">
                        <IoMdNotificationsOutline />
                        <span>Thông báo</span>
                    </a>
                    <ul className="dropdown-menu">
                        {notifications.length > 0 ? notifications.map(
                            (notification, index) => (
                                <NotificationLink key={index} notification={notification} />
                            )
                        ) : (
                            <li>Không có thông báo</li>
                        )}
                    </ul>
                </div>
                <div className="dropdown mx-2">
                    <span className="text-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Ngôn ngữ</span>
                    <ul className="dropdown-menu">
                        <li className="dropdown-item">Tiếng việt</li>
                        <li className="dropdown-item">Tiếng anh</li>
                    </ul>
                </div>
                <div className="dropdown mx-2">
                    <div className="text-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img style={{width: "20px", height: "20px", borderRadius: "50%"}} src={`http://localhost:3001${userInfo.avatar_url}`} alt="Avatar" />
                        <span className="">{userInfo.displayName}</span>
                    </div>
                    <ul className="dropdown-menu">
                        <Link to="/user/account/profile" className="link-light">
                            <li className="dropdown-item">Tài khoản của tôi</li>
                        </Link>
                        <Link to="/user/purchase" className="link-light"> 
                            <li className="dropdown-item">Đơn mua</li>
                        </Link>
                        <li className="dropdown-item" onClick={handleLogout} style={{ cursor: "pointer"}}>Đăng xuất</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

const Header = () => {
    return (
        <div className="container-fruit bg-primary">
            <div className="container">
                <HeaderTop />
                <div className="row">
                    <div className="col-2">
                        <a href="/" className="link-underline-primary">
                            <h1 className="text-light">AIE</h1>
                        </a>
                    </div>
                    <div className="col-8">
                        <div>
                            <form action="" className="py-1 ps-3 bg-light d-flex rounded-1">
                                <input className="w-100" placeholder="Tìm kiếm sản phẩm" type="text" name="keyword" />
                                <button className="mx-1 btn btn-primary rounded-1" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-2 d-flex align-items-center justify-content-center">
                        <div className="dropdown text-light">
                            <FiShoppingCart className="dropdown-toggle fs-4" data-bs-toggle="dropdown" aria-expanded="false" />
                            <ul className="dropdown-menu">
                                <p className="ms-4">Sản phẩm mới thêm</p>
                                <li className="dropdown-item">
                                    <img className="w-25 h-25" src="/logo192.png" alt="img" />
                                    <p className="mx-2">Quần</p>
                                    <p className="text-danger">68.000đ</p>
                                </li>
                                <li className="dropdown-item">
                                    <img className="w-25 h-25" src="/logo192.png" alt="img" />
                                    <p className="mx-2">Quần short kali</p>
                                    <p className="text-danger">68.000đ</p>
                                </li>
                                <li className="dropdown-item">
                                    <img className="w-25 h-25" src="/logo192.png" alt="img" />
                                    <p className="mx-2">Quần short kali giá rẻ</p>
                                    <p className="text-danger">68.000đ</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;