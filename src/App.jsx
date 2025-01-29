import './index.css'
import reactSvg from './assets/react.svg'

function App() {

  const addTask = () => {
    const task = document.querySelector('#taskInput').value
    if (task.trim() === '') {
      document.querySelector('#error').textContent = 'Please enter a task'
      return
    }
    else if (task.length > 100) {
      document.querySelector('#error').textContent = 'Please enter a task with less than 100 characters'
    } 
    else {
      const tasksCount = window.localStorage.length
      const taskEditStart = task.trimStart()
      const taskEditEnd = taskEditStart.trimEnd()
      window.localStorage.setItem(tasksCount + 1, taskEditEnd);
      document.querySelector('#taskInput').value = ''
      window.location.reload()
    }
  }

  const deleteTask = (key) => () => {
    window.localStorage.removeItem(key)
    window.location.reload()
  }

  const endTask = (key) => () => {
    const task = window.localStorage.getItem(key)
    if (task.includes('✅')) return
    window.localStorage.setItem(key, `${task}✅`);
    window.location.reload()
  }

    const notEnd = (key) => () => {
      const task = window.localStorage.getItem(key);
      if (task.includes("✅")){
        const newTaskState = task.replace("✅", "");
        window.localStorage.setItem(key, `${newTaskState}`);
      }
      window.location.reload();
    };

  return (
    <>
      <div>
        <div className="w-full sm:w-200 bg-white p-4 shadow rounded-lg w-1/2 mx-auto mt-20">
          <div className="flex justify-between items-center p-4">
            <h1>React to do App</h1>
            <img src={reactSvg} alt="" />
          </div>
          <div>
            <input
              className="border border-gray-300 p-2 w-1/2 rounded-lg mr-4"
              id="taskInput"
              type="text"
              placeholder="New task"
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
          <div
            className="mt-4 text-left text-gray-700
          h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300"
          >
            <ul>
              {Object.keys(window.localStorage).map((key) => (
                <li
                  className="flex justify-between items-center border-b border-gray-300 p-2"
                  key={key}
                >
                  <p id={key} className="w-30 break-words flex-1 m-1">
                    {window.localStorage.getItem(key)}
                  </p>
                  <div className="flex flex-col border-l-1 sm:flex-row">
                    <button
                      className="bg-red-500 text-white p-1 m-1 rounded-lg hover:cursor-pointer"
                      onClick={deleteTask(key)}
                    >
                      delete
                    </button>
                    <button
                      className="bg-green-500 text-white p-1 m-1 rounded-lg hover:cursor-pointer"
                      onClick={endTask(key)}
                    >
                      end
                    </button>
                    <button
                      className="bg-gray-500 text-white p-1 m-1 rounded-lg hover:cursor-pointer"
                      onClick={notEnd(key)}
                    >
                      not end
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Made by jabir-git</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
