import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import { AuthContext } from './contexts/AuthContext';

import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useContext } from 'react';

function App() {
  // check authentication status based on token
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={ <ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/"/> : <Register />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/"/> : <Login />} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/reset-password/:token' element={<ResetPassword/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
