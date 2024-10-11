import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Login />
      </div>
    </Router>
  );
}

export default App;
