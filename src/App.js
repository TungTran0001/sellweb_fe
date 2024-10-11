import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Register/>
      </div>
    </Router>
  );
}

export default App;
