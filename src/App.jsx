import { useState, useEffect } from "react";
import "./index.css";
import reactSvg from "./assets/react.svg";

function App() {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState("light");

  // Charger les tâches au démarrage de l'application
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const addTask = () => {
    const taskInput = document.querySelector("#taskInput").value;
    if (taskInput.trim() === "") {
      document.querySelector("#error").textContent = "Please enter a task";
      return;
    } else if (taskInput.length > 100) {
      document.querySelector("#error").textContent =
        "Please enter a task with less than 100 characters";
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskInput.trim(),
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    document.querySelector("#taskInput").value = "";
  };

  const deleteTask = (id) => () => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const toggleTaskCompletion = (id) => () => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div
      className={`w-full h-screen flex justify-center items-center ${
        theme === "light" ? "bg-gray-100" : "bg-gray-800"
      }`}
    >
      <div
        className={`w-full sm:w-200 p-4 rounded-lg w-1/2 mx-auto`}
      >
        <div className="flex justify-between mb-4 items-center">
          <h1
            className={`${
              theme === "light" ? "text-gray-900" : "text-stone-50"
            }`}
          >
            React todo App
          </h1>
          <div className="flex items-center space-x-4">
            <button
              className={`${theme === "light" ? "bg-gray-500 text-stone-50" : "bg-stone-200 text-gray-900"} px-2 py-1 rounded-lg hover:cursor-pointer`}
              onClick={toggleTheme}
            >
              {theme === "light" ? "Dark theme" : "Light theme"}
            </button>
            <img src={reactSvg} alt="React logo" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <input
            className={`border border-gray-300 outline-none ${
              theme === "light"
                ? "text-gray-900 bg-stone-50"
                : "text-stone-50 bg-gray-900"
            } p-2 rounded-lg`}
            id="taskInput"
            placeholder="Enter a task"
            type="text"
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-lg hover:cursor-pointer"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <div>
          <h2 id="error" className="my-4 text-red-400"></h2>
        </div>
        <div className="mt-4 text-left text-gray-700 h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
          <ul>
            {tasks.map((task) => (
              <li
                className="flex justify-between items-center border-b border-gray-300 p-2"
                key={task.id}
              >
                <p
                  className={`w-30 break-words flex-1 m-1 ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.text}
                </p>
                <div className="flex flex-col border-l-1 sm:flex-row">
                  <button
                    className="bg-red-500 text-white p-1 m-1 rounded-lg hover:cursor-pointer"
                    onClick={deleteTask(task.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-500 text-white p-1 m-1 rounded-lg hover:cursor-pointer"
                    onClick={toggleTaskCompletion(task.id)}
                  >
                    {task.completed ? "Not End" : "End"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1
            className={`${
              theme === "light" ? "text-gray-900" : "text-stone-50"
            }`}
          >
            Made by jabir-git
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
