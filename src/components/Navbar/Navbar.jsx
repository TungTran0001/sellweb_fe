import './Navbar.css';

import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
    const location = useLocation(); // Lấy đường dẫn hiện tại

    return (
        <nav className="navbar bg-light p-4">
            <div className="container-fluid">
                {/* Logo */}
                <Link className="navbar-brand" to="/">MyApp</Link>
                {/* Menu dạng dọc */}
                <ul className="navbar-nav flex-column w-100 text-start">
                    {/* Dropdown menu */}
                    <li className="nav-item dropdown">
                        <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button">
                            Tài khoản của tôi
                        </span>
                        <ul className="dropdown-menu">
                            <li>
                                <Link className={`dropdown-item ${location.pathname === "/user/account/profile" ? "active" : ""}`} to="/user/account/profile">Hồ sơ</Link>
                            </li>
                            <li>
                                <Link className={`dropdown-item ${location.pathname === "/user/account//address" ? "active" : ""}`} to="/user/account//address">Địa chỉ</Link>
                            </li>
                            <li>
                                <Link className={`dropdown-item ${location.pathname === "/user/account/password" ? "active" : ""}`} to="/user/account/password">Đổi mật khẩu</Link>
                            </li>
                        </ul>
                    </li>
                    {/* Thêm các menu khác */}
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/user/purchase" ? "active" : ""}`} to="/user/purchase">Đơn mua</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/user/notifications/order" ? "active" : ""}`} to="/user/notifications/order">Thông báo</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;