export const formatDate = (isoDate) => {
    if (!isoDate) return ""; // Kiểm tra nếu không có giá trị
    const date = new Date(isoDate); // Chuyển chuỗi thành đối tượng Date
    const year = date.getFullYear(); // Lấy năm (yyyy)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (mm)
    const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày (dd)
    return `${year}-${month}-${day}`; // Trả về định dạng yyyy-MM-dd
}