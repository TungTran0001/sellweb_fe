import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import ProtectedRoute from './components/ProtectedRoute';
import { refreshAccessToken } from './api/authService';


function App() {
  // check authentication status based on token
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const accessToken = Cookies.get('accessToken');
      if (!accessToken) {
        // Nếu không có accessToken, thử làm mới nó
        const newAccessToken = await refreshAccessToken();
        if (!newAccessToken) {
          // Không thể làm mới token => Chuyển hướng người dùng đến trang đăng nhập
          setIsAuthenticated(false);
          return;
        }
        setIsAuthenticated(true); // Token mới đã được lấy
      } else {
        setIsAuthenticated(true); // Access token hợp lệ
      }
    };
    // Kiểm tra trạng thái xác thực khi component được render
    checkAuthStatus();
    // Đăng ký sự kiện thay đổi cookie để cập nhật trạng thái đăng nhập khi token thay đổi
    const intervalId = setInterval(checkAuthStatus, 60000) // kiểm tra 1 phút
    return () => clearInterval(intervalId); // xóa interval khi component bị unmount
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={isAuthenticated ? <Navigate to="/"/> : <Register />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/"/> : <Login />} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/reset-password/:token' element={<ResetPassword/>} />
          <Route path="/" element={ <ProtectedRoute><Home /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
