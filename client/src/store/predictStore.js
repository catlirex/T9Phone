import { createSlice, configureStore } from "@reduxjs/toolkit";

const predictSlice = createSlice({
  name: "predict",
  initialState: {
    value: false,
  },
  reducers: {
    switchMode: (state) => {
      state.value = !state.value;
    },
  },
});

export const { switchMode } = predictSlice.actions;

export const modeStore = configureStore({
  reducer: predictSlice.reducer,
});
