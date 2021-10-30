import create from "zustand";

const useStore = create((set, get) => ({
  predictMode: false,
  switchMode: () => set({ predictMode: !get().predictMode }),

  input: [""],
  setInput: (payload) => set({ input: payload }),

  output: [],
  setOutput: (payload) => set({ output: payload }),
}));

export default useStore;
