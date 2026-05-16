import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice.js"
import todoReducer from "../features/todo/todoSlice.js"
const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer
  },
});

export { store };
