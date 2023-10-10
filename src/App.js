import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MainComponent from "./MainComponent";
import { Provider } from "react-redux";
import { Store } from "./redux/Store";

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <BrowserRouter>
          <MainComponent />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
