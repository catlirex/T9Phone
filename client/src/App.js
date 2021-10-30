import logo from "./logo.svg";
import "./App.css";
import { modeStore } from "./store/predictStore";
import { messageStore } from "./store/messageStore";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <h1>T9 phone demo input</h1>
        <div className="input-mode">
          <button>Non Predict Mode</button>
          <button>Predict Mode</button>
        </div>

        <div className="phone"></div>
      </div>
    </div>
  );
}

export default App;
