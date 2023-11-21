// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import CocktailList from "./components/CocktailList/CocktailList";
import Header from "./components/Header/Header";
import Navbar from "./components/Navigation/Navigation";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import "./App.css";

function MainContent() {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!isAuthRoute && <Navbar />}
      <Routes>
        <Route exact path="/" element={<CocktailList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <MainContent />
      </div>
    </Router>
  );
}

export default App;
