import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Task from './views/Task';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Login from './components/Login';
import Edit from './views/Edit';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/Task" element={<Task />} />
          <Route exact path="/edit/:taskId" element={<Edit />} />
          <Route path='*' exact={true} element={<NotFound />} />
        </Routes>
      </BrowserRouter> 

    </>
  );
}

export default App;
