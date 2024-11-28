import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import { AuthProvider } from './contexts/AuthContext';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GuestRoute from './components/GuestRoute';

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
