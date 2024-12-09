import Header from "../components/Header"
import Navbar from "../components/Navbar";

const Profile = () => {
    return (
        <div>
            <div className="fixed-top">
                <Header />
            </div>
            <div className="container d-flex" style={{paddingTop: "130px"}}>
                <div className="col-4">
                    <Navbar/>
                </div>
                <div className="col-8 p-4">
                    <form action="">
                        <div className="text-start">
                            <h5>Hồ sơ của tôi</h5>
                            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                        </div>
                        <div className="row mt-4">
                            <div className="col-3">
                                Tên
                            </div>
                            <input className="col-9" type="text" />
                        </div>
                        <div className="row mt-4">
                            <div className="col-3">
                                Số điện thoại
                            </div>
                            <input className="col-9" type="text" />
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
                                <input type="date" />
                            </p>
                        </div>
                        <div className="row mt-4">
                            <div className="col-3">
                                Địa chỉ
                            </div>
                            <input className="col-9" type="text" />
                        </div>
                        <div>
                            <button className="mt-4 btn btn-primary">Lưu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile;