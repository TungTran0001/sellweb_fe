import { Link } from "react-router-dom";
import Header from "../components/Header"

const Profile = () => {
    return (
        <div>
            <Header />
            <div className="container d-flex">
                <div className="col-4">
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-sm-start">
                        <li className="nav-item">
                            <Link className="nav-link align-middle px-0 text-black" to="/profile">Tài khoản của tôi</Link>
                        </li>
                        <li className="nav-item mb-1">
                            <Link className="nav-link align-middle px-0 text-black" to="/address">Địa chỉ</Link>
                        </li>
                        <li className="nav-item mb-1">
                            <Link className="nav-link align-middle px-0 text-black" to="/change-password">Đổi mật khẩu</Link>
                        </li>
                        <li className="nav-item mb-1">
                            <Link className="nav-link align-middle px-0 text-black" to="/address">Đơn mua</Link>
                        </li>
                        <li className="nav-item mb-1">
                            <Link className="nav-link align-middle px-0 text-black" to="/notification">Thông báo</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-8">
                    <div className="border-bottom text-start">
                        <h5>Hồ sơ của tôi</h5>
                        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                    </div>
                    <div className="row mt-4">
                        <div className="col-3">
                            Tên đăng nhập
                        </div>
                        <div className="col-9">tung_it</div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-3">
                            Tên
                        </div>
                        <input className="col-9" />
                    </div>
                    <div className="row mt-4">
                        <div className="col-3">
                            Email
                        </div>
                        <input className="col-9" />
                    </div>
                    <div className="row mt-4">
                        <div className="col-3">
                            Số điện thoại
                        </div>
                        <input className="col-9" />
                    </div>
                    <div className="row mt-4">
                        <div className="col-3">
                            Giới tính
                        </div>
                        <div className="col-9 text-start">
                            <input type="radio" value="Male" name="gender" /> Nam
                            <input className="ms-3" type="radio" value="Female" name="gender" /> Nữ
                            <input className="ms-3" type="radio" value="Other" name="gender" /> Other
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-3">
                            Ngày sinh
                        </div>
                        <p className="col-9 text-start">
                            10/8/2010
                        </p>
                    </div>
                    <div>
                        <button className="mt-4 btn btn-primary">Lưu</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;