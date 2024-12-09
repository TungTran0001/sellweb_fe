import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MyApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto text-start">
                        {/* Dropdown menu */}
                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button">
                                Tài khoản của tôi
                            </span>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/profile">Hồ sơ</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/address">Địa chỉ</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/change-password">Đổi mật khẩu</Link>
                                </li>
                            </ul>
                        </li>
                        {/* Thêm các menu khác */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/purchase">Đơn mua</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/notifications/order">Thông báo</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;