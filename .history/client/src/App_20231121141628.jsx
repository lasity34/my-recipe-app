// App.jsx
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
        <Route exact path="/" element={<CocktailList />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<LayoutWithHeader />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Add other routes that should not include the header and navbar directly here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
