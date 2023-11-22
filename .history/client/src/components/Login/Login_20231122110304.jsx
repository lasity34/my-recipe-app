// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "./Login.css";

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

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
            // Assuming the backend returns some form of user data
            const userData = await response.json();
            if (userData.role === 'admin') {
                navigate('/admin'); // Redirect to admin page
            } else {
                navigate('/'); // Redirect to home page or other user-specific page
            }
        } else {
            if (response.status === 401) { // or whatever status code your backend uses for "user not found"
                console.error('Login failed: User does not exist or wrong credentials.');
                // Optionally, set a state variable to show an error message to the user
            } else {
                console.error('Failed to login');
                // Handle other types of login failure
            }
        }
    } catch (error) {
        console.error('Error during login:', error);
        // Handle network or other errors
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

