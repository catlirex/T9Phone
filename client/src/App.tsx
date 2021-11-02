import React from "react";
import "./App.css";
import Display from "./components/Display";
import KeyBoard from "./components/Keyboard/Keyboard";
import SwitchLabels from "./components/Switch";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <h1>T9 phone demo input</h1>
        <div className="mode">
          <SwitchLabels />
        </div>
        <main>
          <section className="phone">
            <Display />
            <KeyBoard />
          </section>
          <section className="description">
            <h2>Predict Mode</h2>
            <p>
              Input number 2-9, will predict word from "unigram" most frequent
              50k words
            </p>
            <p>//example: "6666" = [ 'moon', 'noon', 'mono' ]</p>
            <p>Next or "arrow right" key can shift words (if any)</p>

            <h2>Non-predict Mode</h2>
            <p>
              System with return alphabet according how many times you click the
              key
            </p>
            <p>//example: eat = "3328"</p>
            <p>Next or "arrow right" key start the next alphabet</p>
            <p>//example: cat = "222+next+28"</p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
