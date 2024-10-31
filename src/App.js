import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  // check authentication status based on token
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={ <ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/"/> : <Register />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/"/> : <Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
