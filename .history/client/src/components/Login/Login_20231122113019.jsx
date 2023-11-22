// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "./Login.css";

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('https://boozy-benders.onrender.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (response.ok) {
         
            const userData = await response.json();
            console.log(userData)
            if (userData.role === 'admin') {
                navigate('/admin'); 
            } else {
                navigate('/'); 
            }
        } else {
            if (response.status === 401) {
                console.error('Login failed: User does not exist or wrong credentials.');
               
            } else {
                console.error('Failed to login');
                
            }
            setTimeout(() => {
              setErrorMessage('');
          }, 3000)
        }
    } catch (error) {
      setErrorMessage('Error during login');
      setTimeout(() => {
          setErrorMessage('');
      }, 3000);
  }
};


  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

