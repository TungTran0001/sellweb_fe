import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <ProductDetails />
      </div>
    </Router>
  );
}

export default App;
