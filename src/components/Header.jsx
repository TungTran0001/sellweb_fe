import { IoMdNotificationsOutline } from "react-icons/io";
import { RiQuestionMark } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const HeaderTop = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Gọi API logout để xóa token phía server
            const response = await fetch("http://localhost:3001/api/v1/auth/logout", {
                method: "POST",
                credentials: "include" // Để đảm bảo refreshToken có thể được gửi trong cookie
            });
            if (response.ok) {
                // Xóa bất kỳ trạng thái liên quan ở phía client (nếu cần)
                Cookies.remove("accessToken");
                Cookies.remove("refreshToken");
                // Điều hướng người dùng về trang đăng nhập
                navigate("/login");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Logout failed:", error);
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
                        <li className="dropdown-item">
                            <h6>Cảnh báo đăng nhập</h6>
                            <p>Tài khoản của bạn vừa được phát hiện đăng nhập ở thiết bị dektop</p>
                        </li>
                        <li className="dropdown-item">
                            <h6>Cảnh báo đăng nhập</h6>
                            <p>Tài khoản của bạn vừa được phát hiện đăng nhập ở thiết bị dektop</p>
                        </li>
                        <li className="dropdown-item">
                            <h6>Cảnh báo đăng nhập</h6>
                            <p>Tài khoản của bạn vừa được phát hiện đăng nhập ở thiết bị dektop</p>
                        </li>
                    </ul>
                </div>
                <a href="/#" className="text-light mx-2 link-underline-primary">
                    <RiQuestionMark />
                    <span>Hỗ trợ</span>
                </a>
                <div className="dropdown mx-2">
                    <span className="text-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Ngôn ngữ</span>
                    <ul className="dropdown-menu">
                        <li className="dropdown-item">Tiếng việt</li>
                        <li className="dropdown-item">Tiếng anh</li>
                    </ul>
                </div>
                <div className="dropdown mx-2">
                    <div className="text-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img style={{width: "20px", height: "20px", borderRadius: "50%"}} src="/slider1.jpg" alt="img" />
                        <span className="">Tùng Trần</span>
                    </div>
                    <ul className="dropdown-menu">
                        <li className="dropdown-item">Tài khoản của tôi</li>
                        <li className="dropdown-item">Đơn mua</li>
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
                                <button className="mx-1 btn btn-primary rounded-1" type="submit">search</button>
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