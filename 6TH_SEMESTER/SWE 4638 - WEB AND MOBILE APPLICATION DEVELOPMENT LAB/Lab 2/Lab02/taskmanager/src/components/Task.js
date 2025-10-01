//210042112

import "../App.css";

function Task(props) {
  const colorbasedonstatus = props.completed ? "completed" : "pending";

  return (
    <div className={`container ${colorbasedonstatus}`}>
      <div className="title">
        <span className="name">{props.name}</span>
        <div className="status">
          {props.completed ? "\u2713 Completed" : "\u27f3 Pending"}
        </div>
      </div>
      <button className="remove-button">Remove</button>
    </div>
  );
}

export default Task;

// -_- N4M154 -_-
