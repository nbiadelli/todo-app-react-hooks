import React, { createContext, useState, useEffect } from "react";
import uuid from "uuid";

export const TaskListContext = createContext();
const TaskListContextProvider = props => {
  const initialState = JSON.parse(localStorage.getItem("tasks")) || [];

  const [tasks, setTasks] = useState(initialState);

  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = title => {
    setTasks([...tasks, { title, id: uuid(), done: false }]);
  };

  const removeTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = e => {
    e.persist();
    const tsk = tasks.find(f => f.id === e.target.id);
    tsk.done = !tsk.done;
    const tasksUndone = tasks.filter(x => !x.done);
    const tasksDone = tasks.filter(x => x.done);
    setTasks([...tasksUndone, ...tasksDone]);
  };

  const cleartList = e => {
    e.preventDefault();
    setTasks([]);
  };

  const findItem = id => {
    const item = tasks.find(task => task.id === id);
    console.log("oioi", item);
    setEditItem(item);
  };

  const editTask = (title, id) => {
    const newTasks = tasks.map(task => (task.id === id ? { title, id } : task));
    setTasks(newTasks);
    setEditItem(null);
  };

  return (
    <TaskListContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        cleartList,
        findItem,
        editTask,
        editItem,
        toggleTask,
      }}>
      {props.children}
    </TaskListContext.Provider>
  );
};

export default TaskListContextProvider;
