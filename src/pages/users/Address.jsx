import { useState } from "react";
import LayoutUser from "../../components/Layouts/LayoutUser";

const Address = () => {
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            name: "Trần Quốc Tùng",
            phone: "(+84) 914 842 611",
            address: "Tái Định Cư Kỳ Lợi, Xã Kỳ Lợi, Thị Xã Kỳ Anh, Hà Tĩnh",
            isDefault: true,
        },
        {
            id: 2,
            name: "Trần Quốc Tùng",
            phone: "(+84) 914 842 611",
            address: "Trường ĐH CNTT Và Truyền Thông Việt Hàn VKU, 460 Trần Đại Nghĩa, Phường Hòa Quý, Quận Ngũ Hành Sơn, Đà Nẵng",
            isDefault: false,
        },
    ]);

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    return (
        <LayoutUser>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3>Địa chỉ của tôi</h3>
                    <button className="btn btn-danger" onClick={toggleModal}>
                        <i className="me-2">+</i>Thêm địa chỉ mới
                    </button>
                </div>
                <h5>Địa chỉ</h5>
                {/* Danh sách địa chỉ */}
                {addresses.map((address) => (
                    <div key={address.id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title mb-3">
                                {address.name} <span className="text-muted">{address.phone}</span>
                            </h5>
                            <p className="card-text mb-2">{address.address}</p>
                            {address.isDefault && (
                                <span className="badge bg-danger">Mặc định</span>
                            )}
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div>
                                    <button className="btn btn-link text-decoration-none">Cập nhập</button>
                                    {!address.isDefault && (
                                        <button className="btn btn-link text-decoration-none text-danger">Xóa</button>
                                    )}
                                </div>
                                {!address.isDefault && (
                                    <button className="btn btn-outline-secondary">Thiết lập mặc định</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Modal thêm địa chỉ */}
                {showModal && (
                    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Địa chỉ mới</h5>
                                    <button className="btn-close" onClick={toggleModal}></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="row mb-3">
                                            <div className="col">
                                                <label htmlFor="name" className="form-label">Họ và tên</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="Họ và tên"
                                                />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="phone" className="form-label" >Số điện thoại</label>
                                                <input 
                                                    type="text"
                                                    className="form-control"
                                                    id="phone"
                                                    placeholder="Số điện thoại"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="address" className="form-label">
                                                Tỉnh/Thành phố
                                            </label>
                                            <select className="form-select" id="address">
                                                <option value="">Chọn Tỉnh/Thành phố</option>
                                                <option value="1">Hà Nội</option>
                                                <option value="2">Đà Nẵng</option>
                                                <option value="3">Hồ Chí Minh</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="address" className="form-label">
                                                Quận/Huyện
                                            </label>
                                            <select className="form-select" id="address">
                                                <option value="">Chọn Quận/Huyện</option>
                                                <option value="1">Hà Nội</option>
                                                <option value="2">Đà Nẵng</option>
                                                <option value="3">Hồ Chí Minh</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="address" className="form-label">
                                                Phường/Xã
                                            </label>
                                            <select className="form-select" id="address">
                                                <option value="">Chọn Phường/Xã</option>
                                                <option value="1">Hà Nội</option>
                                                <option value="2">Đà Nẵng</option>
                                                <option value="3">Hồ Chí Minh</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="specificAddress" className="form-label">Địa chỉ cụ thể</label>
                                            <input 
                                                type="text"
                                                className="form-control"
                                                placeholder="Địa chỉ cụ thể"
                                            />
                                        </div>
                                        <div className="form-check">
                                            <input 
                                                className="form-check-input"
                                                type="checkbox"
                                                id="defaultAddress" 
                                            />
                                            <label className="form-check-label" htmlFor="defaultAddress">
                                                Đặt làm địa chỉ mặc định
                                            </label>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={toggleModal}>Trở lại</button>
                                    <button className="btn btn-danger">Hoàn thành</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </LayoutUser>
    )
}

export default Address;