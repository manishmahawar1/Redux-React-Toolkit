import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  deleteTodo,
  isCompleted,
  editTodo,
  isCompletedTodo,
} from "../features/todo/todoSlice.js";

export default function TodoForm() {
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todo.todos);

  const filterTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
  });

  const handleAddTodo = () => {
    if (!input.trim()) return;

    dispatch(addTodo(input));
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const toggleCompleted = (id) => {
    dispatch(isCompleted(id));
  };

  const handleEditTodo = (id) => {
    if (!editText.trim()) return;

    dispatch(
      editTodo({
        id,
        text: editText,
      }),
    );

    setEdit(null);
    setEditText("");
  };

  const handleIfTaskCompleted = () => {
    dispatch(isCompletedTodo());
  };

  const totalTodos = todos.length;

  const completedTodos = todos.filter((todo) => todo.completed).length;

  const pendingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}

        <div className="text-center mb-10">
          <h1 className="text-5xl pb-3 font-black tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Todo Manager
          </h1>

          <p className="text-zinc-400 mt-3 text-lg">
            Stay organized and productive ✨
          </p>
        </div>

        {/* Input Box */}

        <div className="bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-3xl p-5 shadow-2xl mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write your next task..."
              className="flex-1 bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-zinc-500"
            />

            <button
              onClick={handleAddTodo}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 active:scale-95 transition-all px-8 py-4 rounded-2xl font-semibold shadow-lg"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Filter Buttons */}

        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2 rounded-xl border transition-all ${
              filter === "all"
                ? "bg-white text-black border-white"
                : "bg-zinc-900 border-zinc-700 hover:bg-zinc-800"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`px-5 py-2 rounded-xl border transition-all ${
              filter === "completed"
                ? "bg-green-500 text-white border-green-500"
                : "bg-zinc-900 border-zinc-700 hover:bg-zinc-800"
            }`}
          >
            Completed
          </button>

          <button
            onClick={() => setFilter("pending")}
            className={`px-5 py-2 rounded-xl border transition-all ${
              filter === "pending"
                ? "bg-yellow-500 text-black border-yellow-500"
                : "bg-zinc-900 border-zinc-700 hover:bg-zinc-800"
            }`}
          >
            Pending
          </button>

          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="search todos..."
          />

          <button
            onClick={handleIfTaskCompleted}
            className="px-5 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all"
          >
            Clear Completed
          </button>
        </div>

        {/* Todo List */}

        <div className="space-y-5">
          {filterTodos.length === 0 && (
            <div className="bg-zinc-900 border border-dashed border-zinc-700 rounded-3xl py-16 text-center">
              <h2 className="text-2xl font-bold text-zinc-300">
                No Todos Found 🚀
              </h2>

              <p className="text-zinc-500 mt-2">
                Add a new task to get started.
              </p>
            </div>
          )}

          {filterTodos
            .filter((todo) =>
              todo.text.toLowerCase().includes(search.toLowerCase()),
            )
            .map((todo) => (
              <div
                key={todo.id}
                className={`group bg-zinc-900/80 backdrop-blur-md border rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  todo.completed
                    ? "border-green-500/30"
                    : "border-zinc-800 hover:border-zinc-600"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  {/* Left Side */}

                  <div className="flex items-start gap-4 flex-1">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      disabled={edit === todo.id}
                      onChange={() => toggleCompleted(todo.id)}
                      className="mt-1 w-5 h-5 accent-green-500 cursor-pointer"
                    />

                    <div className="w-full">
                      {edit === todo.id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      ) : (
                        <h3
                          className={`text-xl font-semibold break-words transition-all ${
                            todo.completed
                              ? "line-through text-zinc-500"
                              : "text-white"
                          }`}
                        >
                          {todo.text}
                        </h3>
                      )}

                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-zinc-500">
                        <p>📅 {todo.createdAt}</p>

                        {todo.updatedAt && <p>✏️ {todo.updatedAt}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Right Buttons */}

                  <div className="flex items-center gap-3">
                    {edit === todo.id ? (
                      <button
                        onClick={() => handleEditTodo(todo.id)}
                        className="bg-yellow-500 text-black hover:bg-yellow-400 transition-all px-5 py-2 rounded-xl font-semibold"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditText(todo.text);
                          setEdit(todo.id);
                        }}
                        className="bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-all px-5 py-2 rounded-xl font-medium"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      disabled={edit === todo.id}
                      className={`px-5 py-2 rounded-xl font-medium transition-all ${
                        edit === todo.id
                          ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                          : "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                      }`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Footer */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 mt-5">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Total Tasks</p>

            <h2 className="text-3xl font-bold mt-2">{totalTodos}</h2>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
            <p className="text-green-400 text-sm">Completed</p>

            <h2 className="text-3xl font-bold mt-2 text-green-400">
              {completedTodos}
            </h2>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5">
            <p className="text-yellow-400 text-sm">Pending</p>

            <h2 className="text-3xl font-bold mt-2 text-yellow-400">
              {pendingTodos}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
