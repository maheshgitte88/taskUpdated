import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/users/login`, {
                email,
                password,
            });
            const login = response.data.token;
            localStorage.setItem('token', login);
            toast.success('successful login...!');
            window.location = '/Task';
        } catch (error) {
            console.error('Login error:', error.response.data.error);
            setError(error.response.data.error);

        }
    };

    return (
        <>
            <div className='p-5'>
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                {error && <div className="alert alert-danger">{error}</div>}

                <Modal.Body>
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </form>
                            <p className="mt-3">
                                if Not plase registered? <a href="/register">Register here</a>
                            </p>
                        </div>
                    </div>
                </Modal.Body>
            </div>

        </>
    )
}

export default Login