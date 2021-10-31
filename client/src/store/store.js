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

  startNextWord: () => {
    set({
      input: [...get().input, get().currentInput],
      output: [...get().output, get().currentOutput],
      currentInput: "",
      currentOutput: "",
    });
  },
}));

export default useStore;
