import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios.get("http://localhost:5002/api/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const addTask = () => {
    if (newTask.trim()) {
      axios.post("http://localhost:5002/api/tasks", { text: newTask, completed: false })
        .then(res => setTasks([...tasks, res.data]));
      setNewTask("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTask();
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5002/api/tasks?id=${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)));
  };

  const deleteAllTasks = () => {
    if (window.confirm("Are you sure you want to delete ALL tasks?")) {
      axios.delete("http://localhost:5002/api/tasks/deleteAll")
        .then(() => setTasks([]));
    }
  };

  const deleteCompletedTasks = () => {
    if (window.confirm("Are you sure you want to delete completed tasks?")) {
      axios.delete("http://localhost:5002/api/tasks/deleteCompleted")
        .then(() => setTasks(tasks.filter(task => !task.completed)));
    }
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task._id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    axios.put(`http://localhost:5002/api/tasks?id=${id}`, {
      completed: !tasks.find(task => task._id === id).completed
    });
  };

  const editTask = (id, newText) => {
    const updatedTasks = tasks.map(task =>
      task._id === id ? { ...task, text: newText, isEditing: false } : task
    );
    setTasks(updatedTasks);

    axios.put(`http://localhost:5002/api/tasks?id=${id}`, { text: newText });
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "done") return task.completed;
    if (filter === "todo") return !task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">TASKISTRY</h1>
        <p className="app-subtitle">Your place to get all things done, one at a timee</p>
      </header>

      <div className="input-container">
        <div className="input-group">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder=""
            className="task-input"
          />
          <button onClick={addTask} className="add-button">
            <span className="button-icon">+</span> Add Task
          </button>
        </div>
      </div>

      <div className="filters">
        <button 
          className={`filter-button ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button 
          className={`filter-button ${filter === "todo" ? "active" : ""}`}
          onClick={() => setFilter("todo")}
        >
          To Do
        </button>
        <button 
          className={`filter-button ${filter === "done" ? "active" : ""}`}
          onClick={() => setFilter("done")}
        >
          Completed
        </button>
      </div>

      <div className="task-stats">
        <button className="s1">STATS</button>
        <span>Total: {tasks.length}</span>
        <span>To Do: {tasks.filter(t => !t.completed).length}</span>
        <span>Completed: {tasks.filter(t => t.completed).length}</span>
      </div>

      <ul className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <li 
              key={task._id} 
              className={`task-item ${task.completed ? "completed" : ""}`}
            >
              <div className="task-content">
                <div 
                  className="task-checkbox"
                  onClick={() => toggleComplete(task._id)}
                >
                  {task.completed ? "✓" : ""}
                </div>
                
                {task.isEditing ? (
                  <input
                    type="text"
                    value={task.text}
                    autoFocus
                    onChange={(e) => setTasks(tasks.map(t => 
                      t._id === task._id ? { ...t, text: e.target.value } : t
                    ))}
                    className="edit-input"
                  />
                ) : (
                  <span className="task-text">{task.text}</span>
                )}
              </div>

              <div className="task-actions">
                <button
                  onClick={() => 
                    task.isEditing
                      ? editTask(task._id, task.text)
                      : setTasks(tasks.map(t => 
                          t._id === task._id ? { ...t, isEditing: true } : t
                        ))
                  }
                  className="action-button edit-button"
                >
                  {task.isEditing ? "💾" : "✏️"}
                </button>
                <button 
                  onClick={() => deleteTask(task._id)}
                  className="action-button delete-button"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="empty-state">
            <p>No tasks found</p>
            <p>Add a new task or change your filter</p>
          </li>
        )}
      </ul>

      <div className="bulk-actions">
        <button 
          onClick={deleteCompletedTasks}
          className="bulk-button delete-completed"
          disabled={!tasks.some(task => task.completed)}
        >
          Clear Completed Tasks
        </button>
        <button 
          onClick={deleteAllTasks}
          className="bulk-button delete-all"
          disabled={tasks.length === 0}
        >
          Clear All Tasks
        </button>
      </div>
    </div>
  );
};

export default App;