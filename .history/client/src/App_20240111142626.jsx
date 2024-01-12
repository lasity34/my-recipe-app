import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CocktailList from "./components/CocktailList/CocktailList";
import Header from "./components/Header/Header";
import Navbar from "./components/Navigation/Navigation";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Admin from "./components/Admin/Admin";
import "./App.css";
function LayoutWithHeader() {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />  
    </>
  );
}
function App() {
  return (
    <div className="app">
      <CocktailList />
    </div>
  );
}




export default App;

