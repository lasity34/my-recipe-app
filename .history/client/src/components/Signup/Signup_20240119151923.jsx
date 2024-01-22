import React, { useState } from "react";
import  axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./Signup.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });


  const [error, setError] = useState(""); // State to handle error messages
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
  
    try {
      const response = await axios.post('https://boozy-benders.onrender.com/api/auth/signup', formData);
  
      if (response.status === 201) {
        navigate('/'); // Redirect to home on successful signup
      } else {
        setError('Signup failed'); // Set error message
      }
    } catch (error) {
      console.log(error); // Log the entire error object for debugging
  
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Data:", error.response.data);
        console.log("Status:", error.response.status);
        console.log("Headers:", error.response.headers);
  
        setError(error.response.data.error || 'Signup failed');
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Request:", error.request);
        setError('No response from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error Message:", error.message);
        setError(error.message);
      }
    }
  };
  

  return (
    <div className="signup-container">
      <h2 className="signup-header">Sign Up</h2> 
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
