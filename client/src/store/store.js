import create from "zustand";

const useStore = create((set, get) => ({
  predictMode: false,
  switchMode: () => set({ predictMode: !get().predictMode }),

  input: [""],
  setInput: (payload) => set({ input: payload }),

  output: ["hi", "serw", "123"],
  setOutput: (payload) => set({ output: payload }),

  currentInput: "",
  setCurrentInput: (payload) => set({ currentInput: payload }),

  currentOutput: "",
  setCurrentOutput: (payload) => set({ currentOutput: payload }),
}));

export default useStore;
