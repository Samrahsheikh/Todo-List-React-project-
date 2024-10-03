import { useState } from 'react';
import './App.css';

interface Task {
  id: number;
  text: string;
  isCompleted: boolean;
}

function App() {
  const [taskInput, setTaskInput] = useState<string>(''); // Input field state
  const [tasks, setTasks] = useState<Task[]>([]); // List of tasks
  const [editTaskId, setEditTaskId] = useState<number | null>(null); // ID of task being edited

  const handleAddOrUpdateTask = () => {
    if (taskInput.trim()) {
      if (editTaskId !== null) {
        // Update existing task
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === editTaskId ? { ...task, text: taskInput } : task
          )
        );
        setEditTaskId(null);
      } else {
        // Add new task
        const newTask: Task = {
          id: Date.now(),
          text: taskInput,
          isCompleted: false,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }
      setTaskInput(''); // Clear the input field
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id: number) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setTaskInput(taskToEdit.text);
      setEditTaskId(id);
    }
  };

  const handleToggleComplete = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return (
    <>
      <h1>My Todo-List</h1>
      <div className="input-container">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={handleAddOrUpdateTask}>
          {editTaskId !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
            <span onClick={() => handleToggleComplete(task.id)}>{task.text}</span>
            <div className="button-group">
              <button onClick={() => handleEditTask(task.id)}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
