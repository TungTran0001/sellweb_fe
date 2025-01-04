import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Profile from './pages/users/Profile';
import Purchase from './pages/users/Purchase';
import { AuthProvider } from './contexts/AuthContext';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GuestRoute from './components/GuestRoute';
import Address from './pages/users/Address';
import ChangePassword from './pages/users/ChangePassword';
import Notification from './pages/users/Notification';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Trang cần đăng nhập */}
            <Route path="/" element={ 
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
              } 
            />
            <Route path="/cart" element={ 
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
              } 
            />
            <Route path="/user/account/profile" element={ 
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
              } 
            />
            <Route path="/user/account/address" element={ 
              <ProtectedRoute>
                <Address />
              </ProtectedRoute>
              } 
            />
            <Route path="/user/account/password" element={ 
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
              } 
            />
            <Route path="/user/purchase" element={ 
              <ProtectedRoute>
                <Purchase />
              </ProtectedRoute>
              } 
            />
            <Route path="/user/notifications/order" element={ 
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
              } 
            />

            {/* Trang dành cho khách */}
            <Route path="/register" element={
              <GuestRoute>
                <Register />
              </GuestRoute>
              } 
            />
            <Route path="/login" element={
              <GuestRoute>
                <Login />
              </GuestRoute>
              } 
            />
            <Route path='/forgot-password' element={
              <GuestRoute>
                <ForgotPassword />
              </GuestRoute>
              } 
            />
            <Route path='/reset-password/:token' element={
              <GuestRoute>
                <ResetPassword />
              </GuestRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
