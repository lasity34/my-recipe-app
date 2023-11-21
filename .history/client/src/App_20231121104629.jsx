// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CocktailList from "./components/CocktailList/CocktailList";
import Header from "./components/Header/Header";
import Navbar from "./components/Navigation/Navigation";
import Signup from "./components/Signup/Signup"; // Ensure this path is correct
import Login from "./components/Login/Login"; // Ensure this path is correct
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<CocktailList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
