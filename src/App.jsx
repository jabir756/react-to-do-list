import './index.css'
import reactSvg from './assets/react.svg'

function App() {

  const addTask = () => {
    const task = document.querySelector('#taskInput').value
    if (task.trim() === '') {
      document.querySelector('#error').textContent = 'Please enter a task'
      return
    }else{
    const tasksCount = window.localStorage.length
    window.localStorage.setItem(`task${tasksCount + 1}`, task)
    document.querySelector('#taskInput').value = ''
    window.location.reload()
    }
  }
 
  const deleteTask = (key) => () => {
    window.localStorage.removeItem(key)
    window.location.reload()
  }
  
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
                  <p className='w-100 break-words'>{window.localStorage.getItem(key)}</p>
                  <button
                    className="bg-red-500 text-white p-1 m-1 rounded-lg hover:cursor-pointer"
                    onClick={deleteTask(key)}
                  >
                    delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Made by jabir756</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
