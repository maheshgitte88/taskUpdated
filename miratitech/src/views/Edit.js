import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Edit() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState('');
    const { taskId } = useParams();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const token = localStorage.getItem('token');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchTask = async () => {
            try {
                const response = await axios.get(`${backendUrl}/task/tasks/${taskId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const fetchedTask = response.data;
                setTitle(fetchedTask.title);
                setDescription(fetchedTask.description);
                setCompleted(fetchedTask.completed);
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };
        fetchTask();
    }, [backendUrl , taskId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `${backendUrl}/task/tasks/${taskId}`,
                {
                    title,
                    description,
                    completed,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success('Task Updated successful...!');
            window.history.back();
 
        } catch (error) {
            console.error('Error updating task:', error);
            toast.error('Task Updated error...!');

        }
    };

    return (
        <div className="container mt-4">
        <h3>Update Task</h3>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="completed"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="completed">
              Completed
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Update Task
          </button>
        </form>
      </div>
    );
}

export default Edit;
