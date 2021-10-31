import { useEffect, useState } from "react";
import useStore from "../../store/store";
import { removeLastChar } from "../../service/helper/helper";
import {
  getNonPredictWord,
  getPredictWord,
} from "../../service/translate/translate.service";

const TOP_FUNCTION = ["reset", "next", "backspace"];
const NUM_KEYBOARD = [
  [
    { value: null, display: 1 },
    { value: 2, display: "2 abc" },
    { value: 3, display: "3 def" },
  ],
  [
    { value: 4, display: "4 ghi" },
    { value: 5, display: "5 jkl" },
    { value: 6, display: "6 mno" },
  ],
  [
    { value: 7, display: "7 pqrs" },
    { value: 8, display: "8 tuv" },
    { value: 9, display: "9 wxyz" },
  ],
];
const BOTTOM_FUNCTION = ["*", " ", "#"];

export default function KeyBoard() {
  const predictMode = useStore((state) => state.predictMode);
  const currentWord = useStore((state) => state.currentInput);
  const currentOutput = useStore((state) => state.currentOutput);

  const setCurrentWord = useStore((state) => state.setCurrentInput);
  const setCurrentOutput = useStore((state) => state.setCurrentOutput);
  const startNextWord = useStore((state) => state.startNextWord);
  const backPerviousWord = useStore((state) => state.backPerviousWord);
  const clearCurrent = useStore((state) => state.clearCurrent);
  const reset = useStore((state) => state.reset);
  const setPredictOutputs = useStore((state) => state.setPredictOutputs);
  const nextWord = useStore((state) => state.nextWord);

  useEffect(() => {
    if (currentWord === "") return;
    if (predictMode)
      getPredictWord(currentWord).then((res) => setPredictOutputs(res));
    if (!predictMode)
      getNonPredictWord(currentWord).then((res) =>
        setCurrentOutput(res.output)
      );
  }, [currentWord, predictMode]);

  const renderTopKey = () => {
    return TOP_FUNCTION.map((target) => (
      <button key={target} onClick={() => handleTopClick(target)}>
        {target}
      </button>
    ));
  };

  const handleTopClick = (target) => {
    if (target === "reset") {
      reset();
    }
    if (target === "backspace") {
      handleSpace();
    }
    if (!predictMode && target === "next") setCurrentWord(currentWord + "+");
    if (predictMode && target === "next") nextWord();
  };

  const handleSpace = () => {
    if (currentOutput === "") backPerviousWord();
    else if (currentOutput.length === 1) clearCurrent();
    else setCurrentWord(removeLastChar(currentWord));
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

  const handleKeyUp = (event) => {
    event.preventDefault();
    const validValue = ["2", "3", "4", "5", "6", "7", "8", "9"];
    if (event.code === "Space") return startNextWord();
    if (event.code === "Backspace") return handleSpace();
    if (!predictMode && event.code === "ArrowRight")
      return setCurrentWord(currentWord + "+");

    if (validValue.includes(event.key)) setCurrentWord(currentWord + event.key);
  };

  return (
    <div className="keyboard-container" onKeyUp={handleKeyUp}>
      {renderTopKey()}
      {renderNumKey()}
      {renderBottomKey()}
    </div>
  );
}
