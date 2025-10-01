//210042112

import TaskTracker from "./components/TaskTracker.js";
import "./App.css";

function App() {
  return (
    <div className="header">
      <h1> Interactive Task Manager</h1>
      <p>
        Click tasks to toggle completion, add new tasks, and manage your to-do
        list!
      </p>

      <TaskTracker />
    </div>
  );
}

export default App;

//-_- N4M154 -_-
