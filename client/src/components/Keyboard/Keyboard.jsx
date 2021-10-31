import { useEffect, useState } from "react";
import useStore from "../../store/store";
import { removeLastChar } from "../../service/helper/helper";
import { getNonPredictWord } from "../../service/translate/translate.service";

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
  const setCurrentWord = useStore((state) => state.setCurrentInput);
  const currentOutput = useStore((state) => state.currentOutput);
  const setCurrentOutput = useStore((state) => state.setCurrentOutput);
  const startNextWord = useStore((state) => state.startNextWord);

  useEffect(() => {
    if (predictMode) return;
    if (currentWord === "") return setCurrentOutput("");
    getNonPredictWord(currentWord).then((res) => setCurrentOutput(res.output));
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
      setCurrentWord("");
      setCurrentOutput("");
    }
    if (target === "backspace") {
      setCurrentWord(removeLastChar(currentWord));
    }
    if (!predictMode && target === "next") setCurrentWord(currentWord + "+");
  };

  const renderNumKey = () => {
    return NUM_KEYBOARD.map((row) =>
      row.map((target) => (
        <button
          key={target}
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

  const handleKey = (event) => {
    event.preventDefault();
    const validValue = ["2", "3", "4", "5", "6", "7", "8", "9"];
    if (event.code === "Space") return startNextWord();
    if (event.code === "Backspace")
      return setCurrentWord(removeLastChar(currentWord));
    if (!predictMode && event.code === "ArrowRight")
      return setCurrentWord(currentWord + "+");

    if (validValue.includes(event.key)) setCurrentWord(currentWord + event.key);
  };

  return (
    <div className="keyboard-container" onKeyUp={handleKey}>
      {renderTopKey()}
      {renderNumKey()}
      {renderBottomKey()}
    </div>
  );
}
