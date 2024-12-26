import { useEffect, useState } from "react";
import axios from "axios";

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
    // State lưu trữ dữ liệu địa lý
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // State lưu trữ giá trị được chọn
    const [selectedProvince, setSelectedProvince] = useState();
    const [selectedDistrict, setSelectedDistrict] = useState();
    const [selectedWard, setSelectedWard] = useState();

    // Lấy danh sách Tỉnh/Thành phố khi mở modal
    useEffect(() => {
        if (showModal) {
            axios
                .get("http://localhost:3001/api/v1/locations/provinces")
                .then((response) => setProvinces(response.data))
                .catch((error) => console.error("Error fetching provinces:", error));
        }
    }, [showModal]);

    // Lấy danh sách Quận/Huyện khi chọn Tỉnh
    useEffect(() => {
        if (selectedProvince) {
            axios.get(`http://localhost:3001/api/v1/locations/districts/${selectedProvince}`)
            .then((response) => setDistricts(response.data))
            .catch((error) => console.error("Error fetching districts:", error));
        } else {
            setDistricts([]);
        }
    }, [selectedProvince]);

    // Lấy danh sách Phường/Xã khi chọn Quận
    useEffect(() => {
        if (selectedDistrict) {
            axios.get(`http://localhost:3001/api/v1/locations/wards/${selectedDistrict}`)
            .then((response) => setWards(response.data))
            .catch((error) => console.error("Error fetching wards:", error));
        } else {
            setWards([]);
        }
    }, [selectedDistrict]);

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
                                            <label htmlFor="province" className="form-label">
                                                Tỉnh/Thành phố
                                            </label>
                                            <select 
                                                className="form-select" 
                                                id="province"
                                                value={selectedProvince}
                                                onChange={(event) => setSelectedProvince(event.target.value) }
                                            >
                                                <option value="">Chọn Tỉnh/Thành phố</option>
                                                {provinces.map((province) => (
                                                    <option key={province.id} value={province.id}>
                                                        {province.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="district" className="form-label">
                                                Quận/Huyện
                                            </label>
                                            <select 
                                                className="form-select" 
                                                id="district"
                                                value={selectedDistrict}
                                                onChange={(event) => setSelectedDistrict(event.target.value)}
                                            >
                                                <option value="">Chọn Quận/Huyện</option>
                                                {districts.map((district) => (
                                                    <option key={district.id} value={district.id}>
                                                        {district.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="ward" className="form-label">
                                                Phường/Xã
                                            </label>
                                            <select 
                                                className="form-select" 
                                                id="ward"
                                                value={selectedWard}
                                                onChange={(event) => setSelectedWard(event.target.value)}
                                            >
                                                <option value="">Chọn Phường/Xã</option>
                                                {wards.map((ward) => (
                                                    <option key={ward.id} value={ward.id}>
                                                        {ward.name}
                                                    </option>
                                                ))}
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