import NotificationLink from "../notifications/NotificationLink";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { logoutUser } from "../../services/authService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getNotifications } from  "../../services/notificationService";
import { Link, useNavigate } from "react-router-dom";
import { getUserHeaderInfo } from "../../services/userService";
import "./Header.css";

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

const HeaderBottom = () => {
    const [isCartHovered, setIsCartHovered] = useState(false);
    const navigate = useNavigate(); // Hook để điều hướng

    const handleMouseEnter = () => {
        setIsCartHovered(true);
    }
    
    const handleMouseLeave = () => {
        setIsCartHovered(false);
    }

    const handleCartClick = () => {
        navigate("/cart"); // Điều hướng tới trang giỏ hàng
    }

    return (
        <div className="row align-items-center">
            {/* Logo */}
            <div className="col-2">
                <a href="/" className="link-underline-primary">
                    <h1 className="text-light">AIE</h1>
                </a>
            </div>

            {/* Search Bar */}
            <div className="col-8">
                <div>
                    <form className="py-1 ps-3 bg-light d-flex rounded-1">
                        <input 
                            className="w-100" 
                            placeholder="Tìm kiếm sản phẩm" 
                            type="text" 
                            name="keyword" 
                        />
                        <button 
                            className="mx-1 btn btn-primary rounded-1" 
                            type="submit"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>

            {/* Cart Section */}
            <div 
                className="col-2 d-flex align-items-center justify-content-center position-relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <FiShoppingCart 
                    className="fs-4 text-light"
                    onClick={handleCartClick}
                    style={{ cursor: "pointer" }}
                />

                {/* Cart Popup */}
                {isCartHovered && (
                    <div 
                        className="cart-popup position-absolute bg-white rounded shadow"
                        style={{ top: "110%", right: "33%" }}
                    >
                        <p className="px-3 py-2 fw-bold border-bottom">Sản phẩm mới thêm</p>
                        <ul className="list-unstyled m-0 p-0">
                            {/* Item 1 */}
                            <li className="d-flex align-items-center px-3 py-2 border-bottom hover-bg">
                                <img
                                    className="rounded"
                                    src="/slider1.jpg" 
                                    alt="img"
                                    style={{ width: "50px", height: "50px", objectFit: "cover" }} 
                                />
                                <div className="ms-3 flex-grow-1">
                                    <p className="mb-1 text-truncate">Quần lửng nam cao cấp giá rẻ</p>
                                    <p className="text-danger m-0">68.000đ</p>
                                </div>
                            </li>
                            {/* Item 2 */}
                            <li className="d-flex align-items-center px-3 py-2 border-bottom hover-bg">
                                <img
                                    className="rounded"
                                    src="/slider1.jpg" 
                                    alt="img"
                                    style={{ width: "50px", height: "50px", objectFit: "cover" }} 
                                />
                                <div className="ms-3 flex-grow-1">
                                    <p className="mb-1 text-truncate">Quần lửng nam cao cấp giá rẻ </p>
                                    <p className="text-danger m-0">68.000đ</p>
                                </div>
                            </li>
                        </ul>
                        <div className="text-center py-2">
                            <button 
                                className="btn btn-primary w-75"
                                onClick={handleCartClick}
                            >
                                Xem giỏ hàng
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

const Header = () => {
    return (
        <div className="container-fruit bg-primary">
            <div className="container">
                <HeaderTop />
                <HeaderBottom />
            </div>
        </div>
    )
}

export default Header;