import { useEffect, useState } from "react";
import Header from "../components/Header"
import Navbar from "../components/Navbar";
import { getProfile } from "../services/profileService";
import { formatDate } from "../utils/dateUtils";

const Profile = () => {
    const [profile, setProfile] = useState({});

    useEffect(
        () => {
            const fetchProfile = async () => {
                try {
                    const response = await getProfile();
                    console.log(response.profile[0]);
                    setProfile(response.profile[0]);
                } catch (error) {
                    console.error("Failed to fetch profile:", error.message);
                }
            }
            fetchProfile();
        },
        []
    )
    return (
        <div>
            {/* Header cố định */}
            <div className="fixed-top">
                <Header />
            </div>
            <div className="container" style={{paddingTop: "130px"}}>
                <div className="row">
                    {/* Sidebar bên trái */}
                    <div className="col-lg-4 mb-4">
                        <Navbar/>
                    </div>
                    {/* Nội dung hồ sơ */}
                    <div className="col-lg-8">
                        <div className="card shadow-sm p-4">
                            <h4 className="mb-3">Hồ sơ của tôi</h4>
                            <p className="text-muted">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                            <form action="">
                                {/* Tên */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="">Tên</label>
                                    <input className="form-control" type="text" value={profile.full_name} />
                                </div>
                                {/* Email */}
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Email</label>
                                    <input type="email" className="form-control" value={profile.email} />
                                </div>
                                {/* Số điện thoại */}
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Số điện thoại</label>
                                    <input type="text" className="form-control" value={profile.phone_number} />
                                </div>
                                {/* Giới tính */}
                                <div className="mb-3">
                                    <label htmlFor="">Giới tính</label>
                                    <div>
                                        <input type="radio" name="gender" value="male" checked={profile.gender === "male"} />
                                        Nam
                                        <input className="ms-4" type="radio" name="gender" value="male" checked={profile.gender === "female"} />
                                        Nữ
                                        <input className="ms-4" type="radio" name="gender" value="male" checked={profile.gender === "other"} />
                                        Khác
                                    </div>
                                </div>
                                {/* Ngày sinh */}
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Ngày sinh</label>
                                    <input className="form-control" type="date" value={formatDate(profile.date_of_birth)} />
                                </div>
                                {/* Địa chỉ */}
                                <div className="mb-3">
                                    <label className="form-label">Địa chỉ</label>
                                    <input className="form-control" type="text" value={profile.address} />
                                </div>
                                {/* Nút hành động */}
                                <div className="d-flex justify-content-between mt-4">
                                    <button type="button" className="btn btn-secondary">Hủy</button>
                                    <button type="submit" className="btn btn-primary" >Lưu</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;