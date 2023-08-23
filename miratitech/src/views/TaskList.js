import React from 'react';
import { Link } from 'react-router-dom';
const TaskList = ({ tasks, onUpdate , onDelete  }) => {

  return (
    <>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {tasks.map(task => (
          <div key={task._id} className="col">
            <div className="card h-100">
              <div className="card-header d-flex">
                <div >
                  <strong>Title: </strong>
                  {task.title}
                </div>
                <div className='ps-5 ms-5 text-end'>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onUpdate(task._id, !task.completed)}
                  />
                </div>
              </div>
              <div className="card-body">
                <p className="card-text">  <strong>Description :</strong> {task.description}</p>
              </div>
              <div className="card-footer">
                <button onClick={() => onDelete(task._id)} className="btn btn-danger ml-2">Delete</button>
                &nbsp;    &nbsp;
                <button className="btn btn-primary"><Link className='text-white' to={`/edit/${task._id}`}>Edit</Link></button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </>

  );
};

export default TaskList;
