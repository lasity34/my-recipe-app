import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CocktailList from "./components/CocktailList/CocktailList";
import Header from "./components/Header/Header";
import Navbar from "./components/Navigation/Navigation";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import "./App.css";

function LayoutWithHeader() {
  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<CocktailList />} />
        {/* You can add more routes here that require Header and Navbar */}
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LayoutWithHeader />}>
          
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
      
        </Routes>
      </div>
    </Router>
  );
}

export default App;

