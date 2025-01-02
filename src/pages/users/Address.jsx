import { useEffect, useState } from "react";
import axios from "axios";

import LayoutUser from "../../components/Layouts/LayoutUser";
import apiEndpoints from "../../config/apiRouters";
import { createAddress, deleteAddress, getAddresses, updateAddress } from "../../services/addressService";

const Address = () => {
    const [addresses, setAddresses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false); // Xác định chế độ (thêm/cập nhật)
    const [editingAddress, setEditingAddress] = useState(null); // Địa chỉ đang chỉnh sửa

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
        if (!showModal) {
            setEditMode(false);
            setFormData({
                name: "",
                phone: "",
                provinceId: "",
                districtId: "",
                wardId: "",
                specificAddress: "",
                isDefault: false,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Mở modal để chỉnh sửa
    const handleEdit = (address) => {
        setEditMode(true);
        setEditingAddress(address);
        // Tìm ID tương ứng từ tên đã lưu
        const province = provinces.find((item) => item.name === address.province);
        const district = districts.find((item) => item.name === address.district);
        const ward = wards.find((item) => item.name === address.ward);
        setFormData({
            name: address.name,
            phone: address.phone,
            provinceId: province ? province.id : "",
            districtId: district ? district.id : "",
            wardId: ward ? ward.id : "",
            specificAddress: address.specific_address,
            isDefault: address.is_default,
        });
        setShowModal(true);
    }

    // Gửi dữ liệu form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editMode) {
            try {
                const response = await updateAddress(editingAddress.id, formData);
                const addressUpdated = response.address[0];
                // Cập nhật địa chỉ trong danh sách hiển thị
                setAddresses((prevAddresses) =>
                    prevAddresses.map((address) =>
                        address.id === addressUpdated.id ? addressUpdated : address
                    )
                );
                alert(response.message);
            } catch (error) {
                console.log("Lỗi cập nhật: ", error);
                alert("Có lỗi cập nhật địa chỉ. Vui lòng thử lại!");
            }
        } else {
            try {
                // Gửi dữ liệu đến API
                const response = await createAddress(formData);
                const newAddress = response.newAddress[0];
                // Thêm địa chỉ mới vào danh sách địa chỉ
                setAddresses((prevAddresses) => [
                    ...prevAddresses,
                    {
                        id: newAddress.id,
                        name: newAddress.name,
                        phone: newAddress.phone,
                        province: newAddress.province,
                        district: newAddress.district,
                        ward: newAddress.ward,
                        specific_address: newAddress.specific_address,
                        is_default: newAddress.is_default,
                    },
                ]);
                alert(response.message);
            } catch (error) {
                console.log("Lỗi thêm: ", error);
                alert("Có lỗi thêm địa chỉ. Vui lòng thử lại!");
            }
        }
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
    };

    // Xóa địa chỉ
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
            try {
                const response = await deleteAddress(id);
                setAddresses((prevAddresses) =>
                    prevAddresses.filter((address) => address.id !== id)
                );
                alert(response.message);
            } catch (error) {
                console.error("Lỗi khi xóa địa chỉ:", error);
                alert("Không thể xóa địa chỉ. Vui lòng thử lại!");
            }
        }
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
                            <p className="card-text mb-2">{`${address.specific_address}, ${address.ward}, ${address.district}, ${address.province}`}</p>
                            {address.is_default === 1 && (
                                <span className="badge bg-danger">Mặc định</span>
                            )}
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div>
                                    <button className="btn btn-link text-decoration-none" onClick={() => handleEdit(address)}>Cập nhập</button>
                                    {!address.is_default && (
                                        <button 
                                            className="btn btn-link text-decoration-none text-danger"
                                            onClick={() => handleDelete(address.id)}
                                        >
                                            Xóa
                                        </button>
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
                                    <h5 className="modal-title">
                                        {editMode ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}
                                    </h5>
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
                                            <label className="form-check-label" htmlFor="isDefault">
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