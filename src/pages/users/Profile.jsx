import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/profileService";
import { formatDate } from "../../utils/dateUtils";
import LayoutUser from "../../components/Layouts/LayoutUser";

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [editedProfile, setEditedProfile] = useState({});

    useEffect(
        () => {
            const fetchProfile = async () => {
                try {
                    const response = await getProfile();
                    const data = response.profile[0];
                    setProfile(data);
                    setEditedProfile(data);
                } catch (error) {
                    console.error("Failed to fetch profile:", error.message);
                }
            }
            fetchProfile();
        },
        []
    );

    // Xử lý khi người dùng thay đổi input
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedProfile({
            ...editedProfile,
            [name]: value, // Cập nhật giá trị theo name của input
        });
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setEditedProfile({
            ...editedProfile,
            avatar: file, // Lưu file ảnh vào state
        });
    };

    // Xử lý khi nhấn nút Hủy
    const handleCancel = () => {
        setEditedProfile({ ...profile }); // Khôi phục lại dữ liệu ban đầu
    }

    // Xử lý khi nhấn nút Lưu
    const handleSave = async (event) => {
        event.preventDefault();
        try {
            // Tạo đối tượng FormData
            const formData = new FormData();
            // Thêm các trường vào FormData
            for(let key in editedProfile) {
                formData.append(key, editedProfile[key]);
            }
            await updateProfile(formData); // Gửi dữ liệu lên server
            // Cập nhật lại profile sau khi lưu
            setProfile(editedProfile); 
            alert("Cập nhật thông tin thành công!");
        } catch (error) {
            console.error("Failed to update profile:", error.message);
            alert("Đã xảy ra lỗi khi cập nhật thông tin.");
        }
    }

    return (
        <LayoutUser>
            <div className="card shadow-sm p-4">
                <h4 className="mb-3">Hồ sơ của tôi</h4>
                <p className="text-muted">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                <form onSubmit={handleSave}>
                    {/* Avatar */}
                    <div className="d-flex align-items-center flex-column gap-2 mb-3">
                        <img 
                            src={
                                editedProfile.avatar instanceof File 
                                ? URL.createObjectURL(editedProfile.avatar) // Nếu avatar là file mới
                                : (editedProfile.avatar_url // Nếu avatar_url có giá trị hợp lệ
                                    ? `http://localhost:3001${editedProfile.avatar_url}` // URL từ server
                                    : "/defaultAvatar.png") // Avatar mặc định
                            }
                            alt="Avatar" 
                            style={{width: "200px", height: "200px", borderRadius: "50%"}} 
                        />
                        <input type="file" onChange={handleFileChange} />
                        <p>
                            Dung Lượng file tối đa 2 MB <br />
                            Định dạng: .JPEG, .PNG
                        </p>
                    </div>
                    {/* Tên */}
                    <div className="mb-3">
                        <label className="form-label">Tên</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="full_name"
                            value={editedProfile.full_name || ''}
                            onChange={handleInputChange} 
                        />
                    </div>
                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                            type="email"
                            name="email"
                            className="form-control"
                            value={profile.email || ''} 
                            readOnly
                        />
                    </div>
                    {/* Số điện thoại */}
                    <div className="mb-3">
                        <label className="form-label">Số điện thoại</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="phone_number"
                            value={editedProfile.phone_number || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    {/* Giới tính */}
                    <div className="mb-3">
                        <label className="form-label" >Giới tính</label>
                        <div>
                            <input 
                                type="radio" 
                                name="gender" 
                                value="male" 
                                checked={editedProfile.gender === "male"}
                                onChange={handleInputChange} 
                            />
                            Nam
                            <input 
                                className="ms-4" 
                                type="radio" 
                                name="gender" 
                                value="female" 
                                checked={editedProfile.gender === "female"}
                                onChange={handleInputChange} 
                            />
                            Nữ
                            <input 
                                className="ms-4" 
                                type="radio" 
                                name="gender" 
                                value="other" 
                                checked={editedProfile.gender === "other"}
                                onChange={handleInputChange} 
                            />
                            Khác
                        </div>
                    </div>
                    {/* Ngày sinh */}
                    <div className="mb-3">
                        <label className="form-label">Ngày sinh</label>
                        <input 
                            className="form-control" 
                            type="date"
                            name="date_of_birth"
                            value={formatDate(editedProfile.date_of_birth) || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    {/* Địa chỉ */}
                    <div className="mb-3">
                        <label className="form-label">Địa chỉ</label>
                        <input 
                            className="form-control" 
                            type="text"
                            name="address" 
                            value={editedProfile.address || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    {/* Nút hành động */}
                    <div className="d-flex justify-content-between mt-4">
                        <button type="button" className="btn btn-secondary" onClick={handleCancel} >Hủy</button>
                        <button type="submit" className="btn btn-primary" >Lưu</button>
                    </div>
                </form>
            </div>
        </LayoutUser>
    )
}

export default Profile;