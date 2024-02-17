import React, { useState } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState('all');

  const handleNewTaskChange = (event) => {
    setNewTaskTitle(event.target.value);
  };

  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    if (newTaskTitle.trim() !== '') {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        completed: false,
      };
      setTasks([newTask, ...tasks]);
      setNewTaskTitle('');
    }
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'incomplete') {
      return !task.completed;
    } else {
      return true;
    }
  });

  return (
    <div>
      <h1>Task Manager</h1>
      <form onSubmit={handleNewTaskSubmit}>
        <input
          type="text"
          placeholder="Enter new task"
          value={newTaskTitle}
          onChange={handleNewTaskChange}
        />
        <button type="submit">Add Task</button>
      </form>
      <div>
        <label>
          Filter:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </label>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
