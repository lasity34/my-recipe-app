import React, { useState } from "react";
import CocktailList from "./components/CocktailList/CocktailList";
import Header from "./components/Header";
import Navbar from "./components/Navigation";
import "./App.css";

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <Navbar />
        <CocktailList />
      </div>
    </>
  );
}

export default App;
