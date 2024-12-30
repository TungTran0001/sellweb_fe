import { useEffect, useState } from "react";
import axios from "axios";

import LayoutUser from "../../components/Layouts/LayoutUser";
import apiEndpoints from "../../config/apiRouters";
import { createAddress, getAddresses } from "../../services/addressService";

const Address = () => {
    const [addresses, setAddresses] = useState([]);

    const [showModal, setShowModal] = useState(false);
    // State lưu trữ dữ liệu địa lý
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        provinceId: "",
        districtId: "",
        wardId: "",
        specificAddress: "",
        isDefault: false,
    });

    // Lấy danh sách địa chỉ từ API
    useEffect(
        () => {
            const fetchAddresses = async () => {
                try {
                    const response = await getAddresses();
                    setAddresses(response.addresses);
                } catch (error) {
                    console.error("Failed to fetch addresses: ", error);
                }
            }
            fetchAddresses();
        },
        []
    );


    // Lấy danh sách Tỉnh/Thành phố khi mở modal
    useEffect(() => {
        if (showModal) {
            axios.get(apiEndpoints.provinces)
                .then((response) => setProvinces(response.data))
                .catch((error) => console.error("Error fetching provinces:", error));
        }
    }, [showModal]);

    // Lấy danh sách Quận/Huyện khi chọn Tỉnh
    useEffect(() => {
        if (formData.provinceId) {
            axios.get(apiEndpoints.districts(formData.provinceId))
            .then((response) => setDistricts(response.data))
            .catch((error) => console.error("Error fetching districts:", error));
        } else {
            setDistricts([]);
        }
    }, [formData.provinceId]);

    // Lấy danh sách Phường/Xã khi chọn Quận
    useEffect(() => {
        if (formData.districtId) {
            axios.get(apiEndpoints.wards(formData.districtId))
            .then((response) => setWards(response.data))
            .catch((error) => console.error("Error fetching wards:", error));
        } else {
            setWards([]);
        }
    }, [formData.districtId]);

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Gửi dữ liệu form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Gửi dữ liệu đến API
            const data = await createAddress(formData);
            const newAddress = data.newAddress[0];
            // Thêm địa chỉ mới vào danh sách địa chỉ
            setAddresses((prevAddresses) => [
                ...prevAddresses,
                {
                    id: newAddress.id,
                    name: newAddress.name,
                    phone: newAddress.phone,
                    address: `${newAddress.specific_address}, ${wards.find(w => w.id === parseInt(newAddress.ward_id))?.name},
                                ${districts.find(d => d.id === parseInt(newAddress.district_id))?.name},
                                ${provinces.find(p => p.id === parseInt(newAddress.province_id))?.name}`,
                    isDefault: newAddress.is_default,
                },
            ]);

            // Reset form
            setFormData({
                name: "",
                phone: "",
                provinceId: "",
                districtId: "",
                wardId: "",
                specificAddress: "",
                isDefault: false,
            });

            // Đóng modal
            setShowModal(false);
        } catch (error) {
            console.error("failed to create address: ", error);
            alert("Đã xảy ra lỗi khi thêm địa chỉ. Vui lòng thử lại!");
        }
    };

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
                            <p className="card-text mb-2">{`${address.specific_address}, ${address.ward}, ${address.distric}, ${address.province}`}</p>
                            {address.is_default && (
                                <span className="badge bg-danger">Mặc định</span>
                            )}
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div>
                                    <button className="btn btn-link text-decoration-none">Cập nhập</button>
                                    {!address.is_default && (
                                        <button className="btn btn-link text-decoration-none text-danger">Xóa</button>
                                    )}
                                </div>
                                {!address.is_default && (
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
                                    <form onSubmit={handleSubmit}>
                                        <div className="row mb-3">
                                            <div className="col">
                                                <label htmlFor="name" className="form-label">Họ và tên</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Họ và tên"
                                                    required
                                                />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="phone" className="form-label" >Số điện thoại</label>
                                                <input 
                                                    type="text"
                                                    className="form-control"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="Số điện thoại"
                                                    required
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
                                                name="provinceId"
                                                value={formData.provinceId}
                                                onChange={handleChange}
                                                required
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
                                                name="districtId"
                                                value={formData.districtId}
                                                onChange={handleChange}
                                                required
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
                                                name="wardId"
                                                value={formData.wardId}
                                                onChange={handleChange}
                                                required
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
                                                id="specificAddress"
                                                name="specificAddress"
                                                value={formData.specificAddress}
                                                onChange={handleChange}
                                                placeholder="Địa chỉ cụ thể"
                                                required
                                            />
                                        </div>
                                        <div className="form-check">
                                            <input 
                                                className="form-check-input"
                                                type="checkbox"
                                                id="isDefault" 
                                                name="isDefault"
                                                checked={formData.isDefault}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="defaultAddress">
                                                Đặt làm địa chỉ mặc định
                                            </label>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={toggleModal}>Trở lại</button>
                                            <button type="submit" className="btn btn-danger">Hoàn thành</button>
                                        </div>
                                    </form>
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