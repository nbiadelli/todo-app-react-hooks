import React, { useContext } from "react";
import { TaskListContext } from "../context/TaskListContext";

const Task = ({ task }) => {
  const { removeTask, findItem, toggleTask } = useContext(TaskListContext);
  return (
    <li className="list-item" data-testid="list-task">
      <span className={task.done ? "list-item-done" : ""}>{task.title}</span>
      <div>
        <button
          onClick={() => removeTask(task.id)}
          className="btn-delete task-btn">
          <i className="fas fa-trash-alt"></i>
        </button>
        <button className="btn-edit task-btn" onClick={() => findItem(task.id)}>
          <i className="fas fa-pen"></i>
        </button>
        <input
          className="toggle-task"
          type="checkbox"
          id={task.id}
          onClick={toggleTask}
          defaultChecked={task.done}
        />
      </div>
    </li>
  );
};

export default Task;
