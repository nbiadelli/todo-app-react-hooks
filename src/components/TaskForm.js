import React, {useContext, useState, useEffect} from 'react'
import {TaskListContext} from '../context/TaskListContext';

const TaskForm = () => {
    const { addTask, cleartList, editItem, editTask} = useContext(TaskListContext);

    const [title, setTitle]= useState("");

    const handleChange = e => {
        setTitle(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if(!editItem){
            addTask(title);
            setTitle("");
        }else{
            editTask(title, editItem.id);
        }

    };
   
    useEffect(() => {
       if(editItem){
        setTitle(editItem.title);
       }else{
        setTitle("");
       }
    }, [editItem]);

    return (
        <form onSubmit={handleSubmit} className="form">
            <input 
            onChange={handleChange}
            value={title}
            type="text"
            className='task-input'
            placeholder='Adicionar tarefa...' 
            required />
            <div className="buttons">
                <button type='submit' className='btn add-task-btn'>{editItem ? 'Editar' : 'Adicionar'}</button>
                <button onClick={cleartList} type='submit' className='btn clear-btn'>Limpar</button>
            </div>
        </form>
    )
}
export default TaskForm;