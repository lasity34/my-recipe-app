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
      <Outlet />  {/* Nested routes will render here */}
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LayoutWithHeader />}>
            <Route index element={<CocktailList />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;

