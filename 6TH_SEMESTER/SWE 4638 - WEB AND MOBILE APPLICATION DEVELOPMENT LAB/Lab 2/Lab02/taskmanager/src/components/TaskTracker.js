//210042112

import { useState } from "react";
import Task from "./Task";
import "../App.css";

function TaskTracker() {
  const [tasks] = useState([
    { id: 1, title: "1st Task", completed: false },
    { id: 2, title: "2nd Task", completed: true },
    { id: 3, title: "3rd Task", completed: false },
    { id: 4, title: "4th Task", completed: true },
  ]);

  function TaskHistory() {
    let total = tasks.length;
    let completed = tasks.filter((task) => task.completed).length;
    let pending = total - completed;
    return { total, completed, pending };
  }

  let all_tasks = tasks.map((obejct) => (
    <Task
      key={obejct.id}
      id={obejct.id}
      name={obejct.title}
      completed={obejct.completed}
    />
  ));

  return (
    <div>
      <div className="history">
        <div className="history-item">
          <span>{TaskHistory().total}</span>
          Total Tasks
        </div>
        <div className="history-item">
          <span>{TaskHistory().completed}</span>
          Completed
        </div>
        <div className="history-item">
          <span>{TaskHistory().pending}</span>
          Remaining
        </div>
      </div>
      <div className="buttons">
        <button className="add-task-button">Add Random Task</button>
        <button className="clear-completed-button">
          Clear Completed (Available)
        </button>
      </div>
      {all_tasks}
    </div>
  );
}

export default TaskTracker;

// -_- N4M154 -_-
