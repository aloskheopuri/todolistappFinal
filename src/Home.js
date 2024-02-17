import React, { useState } from 'react';
import './App.css';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import Filter from './Component/Filter';

export default function Home() {
  //using hooks for storing task in array
  const [tasks, setTasks] = useState([]);
  
  const [taskTitle, setTaskTitle] = useState('');

  //For filtering Result 
  const [filter, setFilter] = useState('all');

  //Handling value change
  const handleOnChange = (e) => {
    setTaskTitle(e.target.value);
  };

  //Handling on task submitting
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim() !== '') {
      const newTask = {
        title: taskTitle,
        completed: false,
      };

      // Add new task to the top of the list
      setTasks([newTask, ...tasks]); 
      setTaskTitle('');
    }
  };

  //handling delete
  const handleOnDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => taskId !== task.id);
    setTasks(updatedTasks);
  };

  //handling checkbox if task is completed
  const handleToggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  //result on basis of filteration
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'uncompleted') {
      return !task.completed;
    } else {
      return true; 
    }
  });

  return (
    <div>
      <center>

        <div className='to-do-list-container'>

          <div className='list-heading'>
            <h1>To-Do List</h1>
            <ListAltIcon />
          </div>

          <div className='Add-Container'>

            <form onSubmit={handleOnSubmit}>
              <input onChange={handleOnChange} value={taskTitle} className='AddTask' type="text" />
              <button type="submit" className='addbutton'>Add Task</button>
            </form>

           {/* Used props here to pass data from filter to home */}
           <Filter filter={filter} handleFilterChange={handleFilterChange} />

          </div>

          <div className='list-of-tasks'>

            {/* applying mapping on filterd result */}
            <ul>
              {filteredTasks.map((task) => (
                <li className='list-item' key={task.id}>
                  <div className='task-title'>
                    {task.title}
                  </div>

                  <div className='task-actions'>
                    <Checkbox
                      checked={task.completed}
                      onChange={() => handleToggleCompletion(task.id)}
                      sx={{
                        color: pink[800],
                        '&.Mui-checked': {
                          color: pink[600],
                        },
                      }}
                    />
                    <IconButton onClick={() => handleOnDelete(task.id)} edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </div>

                </li>
              ))}
            </ul>

          </div>
        </div>
      </center>
    </div>
  );
}
