import React, { useState } from "react";
import  axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./Signup.css";
import { signupUser } from "../../api/Cocktail";

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
      const response = await signupUser(formData);
      console.log("Signup successful:", response); // Log or use the response data
      navigate('/'); // Redirect to home on successful signup
    } catch (error) {
      console.log(error); // Log the error
      setError(error.response?.data?.error || 'Network error'); // Set error message
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
