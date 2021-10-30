import "./App.css";
import SwitchLabels from "./components/Switch";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <h1>T9 phone demo input</h1>
        <div className="mode">
          <SwitchLabels />
        </div>
        <div className="phone"></div>
      </div>
    </div>
  );
}

export default App;
