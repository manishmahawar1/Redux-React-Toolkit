import { createSlice } from "@reduxjs/toolkit";


const storeTodos = localStorage.getItem("todos");

const initialState = {
  todos: storeTodos ? JSON.parse(storeTodos) : [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newtodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
        createdAt: new Date().toLocaleString(),
        updatedAt: null,
      };
      state.todos.push(newtodo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo, idx) => todo.id !== action.payload,
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    isCompleted: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }

      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    editTodo: (state, action) => {
      const { id, text, createdAt } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);

      if (todo) {
        todo.text = text;
        todo.updatedAt = new Date().toLocaleString();
      }
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    isCompletedTodo: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    // getAllCompletedTodo: (state, action) =>{
    //     state.todos = state.todos.map((todo)=> {[...state.todos, todo.completed]})
    //   localStorage.setItem("todos", JSON.stringify(state.todos));

    // },

    // getAllInCompletedTodo: (state, action) =>{
    //     state.todos = state.todos.filter((todo)=> {[...state.todos, !todo.completed]})
    //   localStorage.setItem("todos", JSON.stringify(state.todos));

    // },

    //  getAllTodos: (state, action) =>{
    //         state.todos = state.todos.map((todo)=> [...todo])
    //         localStorage.setItem("todos", JSON.stringify(state.todos))
    // },
  },
});

export const { addTodo, deleteTodo, isCompleted, editTodo, isCompletedTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
