import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null);

  useEffect(() => {
    const logintoken = localStorage.getItem('token');
    setLoggedIn(logintoken)
  }, [loggedIn])


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    toast.success('Logout successful...!')
    setLoggedIn(false);
    window.location = '/'
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand tw-bold" href='/'>Task Management App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            {loggedIn && (
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            )}
            {!loggedIn && (
              <>
                <button className="btn btn-outline-primary ms-3">
                  <a href='/'>Login</a>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>


    </>
  )
}
