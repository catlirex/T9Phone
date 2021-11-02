export type StoreType = {
  predictMode: boolean;
  switchMode: () => void;

  input: string[];
  output: string[];

  currentInput: string;
  setCurrentInput: (payload: string) => void;

  currentOutput: string;
  setCurrentOutput: (payload: string) => void;

  predictOutputs: string[];
  predictPointer: number;
  setPredictOutputs: (payload: string[]) => void;

  nextWord: () => void;
  startNextWord: () => void;
  backPerviousWord: () => void;
  clearCurrent: () => void;
  reset: () => void;
  handleSpace: () => void;
};
