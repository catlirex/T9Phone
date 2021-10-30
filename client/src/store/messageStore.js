import { createSlice, configureStore } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    input: "",
    output: [""],
  },
  reducers: {
    updateInput: (state, payload) => {
      state.input = payload;
    },
    updateOutput: (state, payload) => {
      state.output = payload;
    },
  },
});

export const { updateInput, updateOutput } = messageSlice.actions;

export const messageStore = configureStore({
  reducer: messageSlice.reducer,
});
