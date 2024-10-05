import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <div className="App">
        <Cart />
      </div>
    </Router>
  );
}

export default App;
