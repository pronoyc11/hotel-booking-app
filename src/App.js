
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainComponent from './MainComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <MainComponent />
      </BrowserRouter>
     
    </div>
  );
}

export default App;
