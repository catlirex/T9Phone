import { useEffect, useState } from "react";
import useStore from "../../store/store";
import { removeLastChar } from "../../service/helper/helper";
import { getNonPredictWord } from "../../service/translate/translate.service";

const TOP_FUNCTION = ["reset", "next", "backspace"];
const NUM_KEYBOARD = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const BOTTOM_FUNCTION = ["*", " ", "#"];

export default function KeyBoard() {
  const predictMode = useStore((state) => state.predictMode);
  const currentWord = useStore((state) => state.currentInput);
  const setCurrentWord = useStore((state) => state.setCurrentInput);
  const setCurrentOutput = useStore((state) => state.setCurrentOutput);

  useEffect(() => {
    if (predictMode) return;
    getNonPredictWord(currentWord).then((word) => setCurrentOutput(word));
  }, [currentWord, predictMode]);

  const renderTopKey = () => {
    if (predictMode)
      return TOP_FUNCTION.map((target) => (
        <button key={target} onClick={() => handleTopClick(target)}>
          {target}
        </button>
      ));
    else
      return TOP_FUNCTION.map((target, index) => (
        <button
          key={target}
          disabled={index === 1}
          onClick={() => handleTopClick(target)}
        >
          {target}
        </button>
      ));
  };

  const handleTopClick = (target) => {
    if (target === "reset") setCurrentWord("");
    if (target === "backspace") setCurrentWord(removeLastChar(currentWord));
  };

  const renderNumKey = () => {
    return NUM_KEYBOARD.map((row) =>
      row.map((target) => (
        <button
          key={target}
          onClick={() => setCurrentWord(currentWord + target.toString())}
        >
          {target}
        </button>
      ))
    );
  };

  const renderBottomKey = () => {
    return BOTTOM_FUNCTION.map((target, index) => (
      <button
        key={target}
        disabled={index !== 1}
        onClick={() => setCurrentWord(currentWord + " ")}
      >
        {index !== 1 ? target : `Space`}
      </button>
    ));
  };

  return (
    <div className="keyboard-container">
      {renderTopKey()}
      {renderNumKey()}
      {renderBottomKey()}
    </div>
  );
}
