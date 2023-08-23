import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    if (!token) {
        toast.error('plz login to Create blog..!',);
        return
    }
    if (!title || !description) {
        return;
    }

    try {
      const response = await axios.post(`${backendUrl}/task/create-task`, {
        title,
        description,
      }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

      onTaskCreated(response.data);
      setTitle('');
      setDescription('');
      toast.success('Task created successful...!');
  
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <>
      <div className="mt-4">
        <h3>Create New Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Create Task</button>
        </form>
      </div>
    </>
  )
}

export default TaskForm