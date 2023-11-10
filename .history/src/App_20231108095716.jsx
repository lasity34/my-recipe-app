import React, { useState } from "react";
import CocktailList from "./components/CocktailList";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <CocktailList />
      </div>
    </>
  );
}

export default App;
