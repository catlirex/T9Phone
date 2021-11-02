import * as React from "react";
import { useEffect } from "react";
import useStore from "../../store/store";
import {
  getNonPredictWord,
  getPredictWord,
} from "../../service/translate/translate.service";

import { TOP_FUNCTION, NUM_KEYBOARD, BOTTOM_FUNCTION } from "./keyboardSetup";

export default function KeyBoard() {
  const predictMode = useStore((state) => state.predictMode);
  const currentWord = useStore((state) => state.currentInput);

  const setCurrentWord = useStore((state) => state.setCurrentInput);
  const setCurrentOutput = useStore((state) => state.setCurrentOutput);
  const startNextWord = useStore((state) => state.startNextWord);
  const reset = useStore((state) => state.reset);
  const setPredictOutputs = useStore((state) => state.setPredictOutputs);
  const nextWord = useStore((state) => state.nextWord);
  const handleSpace = useStore((state) => state.handleSpace);

  useEffect(() => {
    if (currentWord === "") return;
    if (predictMode)
      getPredictWord(currentWord).then((res) => setPredictOutputs(res.result));
    if (!predictMode)
      getNonPredictWord(currentWord).then((res) =>
        setCurrentOutput(res.output)
      );
  }, [currentWord, predictMode, setCurrentOutput, setPredictOutputs]);

  const renderTopKey = () => {
    return TOP_FUNCTION.map((target) => (
      <button key={target} onClick={() => handleTopClick(target)}>
        {target}
      </button>
    ));
  };

  const handleTopClick = (target: string) => {
    if (target === "reset") {
      reset();
    }
    if (target === "backspace") {
      handleSpace();
    }
    if (!predictMode && target === "next") setCurrentWord(currentWord + "+");
    if (predictMode && target === "next") nextWord();
  };

  const renderNumKey = () => {
    return NUM_KEYBOARD.map((row) =>
      row.map((target) => (
        <button
          key={target.display}
          onClick={() =>
            target.value
              ? setCurrentWord(currentWord + target.value.toString())
              : null
          }
        >
          {target.display}
        </button>
      ))
    );
  };

  const renderBottomKey = () => {
    return BOTTOM_FUNCTION.map((target, index) => (
      <button key={target} disabled={index !== 1} onClick={startNextWord}>
        {index !== 1 ? target : `Space`}
      </button>
    ));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault();
    const validValue = ["2", "3", "4", "5", "6", "7", "8", "9"];
    if (event.code === "Space") startNextWord();
    if (event.code === "Backspace") handleSpace();
    if (!predictMode && event.code === "ArrowRight")
      setCurrentWord(currentWord + "+");
    if (predictMode && event.code === "ArrowRight") nextWord();

    if (validValue.includes(event.key)) setCurrentWord(currentWord + event.key);
  };

  return (
    <div className="keyboard-container" onKeyDown={handleKeyDown}>
      {renderTopKey()}
      {renderNumKey()}
      {renderBottomKey()}
    </div>
  );
}
