import create from "zustand";

const useStore = create((set, get) => ({
  predictMode: false,
  switchMode: () => set({ predictMode: !get().predictMode }),

  input: [],
  setInput: (payload) => set({ input: payload }),

  output: [],
  setOutput: (payload) => set({ output: payload }),

  currentInput: "",
  setCurrentInput: (payload) => set({ currentInput: payload }),

  currentOutput: "",
  setCurrentOutput: (payload) => set({ currentOutput: payload }),

  predictOutputs: [],
  predictPointer: 0,
  setPredictOutputs: (payload) =>
    set({
      predictPointer: 0,
      predictOutputs: payload,
      currentOutput: payload[0],
    }),
  nextWord: () => {
    if (get().predictPointer === get().predictOutputs.length - 1)
      set({ predictPointer: 0, currentOutput: get().predictOutputs[0] });
    else
      set({
        predictPointer: get().predictPointer + 1,
        currentOutput: get().predictOutputs[get().predictPointer + 1],
      });
  },

  startNextWord: () => {
    set({
      input: [...get().input, get().currentInput],
      output: [...get().output, get().currentOutput],
      currentInput: "",
      currentOutput: "",
    });
  },

  backPerviousWord: () => {
    if (get().output.length === 0) return;
    set({
      currentInput: get().input.at(-1),
      currentOutput: get().output.at(-1),
      input: [...get().input.slice(0, -1)],
      output: [...get().output.slice(0, -1)],
    });
  },

  clearCurrent: () => {
    set({
      currentInput: "",
      currentOutput: "",
    });
  },

  reset: () => {
    set({ input: [], output: [], currentInput: "", currentOutput: "" });
  },
}));

export default useStore;
