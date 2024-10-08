import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Profile />
      </div>
    </Router>
  );
}

export default App;
