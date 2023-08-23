import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import axios from 'axios';
import TaskList from './TaskList';
import { toast } from 'react-toastify';

function Task() {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem('token')

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${backendUrl}/task/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };


  const handleTaskUpdate = async (taskId, completed) => {
    try {
      await axios.put(`${backendUrl}/task/tasks/${taskId}`, { completed }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };


  const handleToggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };


  const handleTaskDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/task/tasks/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Task Deleted successful...!');
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Task Deleted error...!');
    }
  };


  return (
    <div className="container mt-5">
      <button onClick={handleToggleTaskForm} className="btn btn-primary mt-3">Add New Task</button>
      {showTaskForm && <TaskForm onTaskCreated={handleTaskCreated} />}

      <h2>Task List</h2>
      <TaskList tasks={tasks} onUpdate={(taskId, completed) => handleTaskUpdate(taskId, completed)} onDelete={(taskId) => handleTaskDelete(taskId)} />
    </div>
  );
}

export default Task;
