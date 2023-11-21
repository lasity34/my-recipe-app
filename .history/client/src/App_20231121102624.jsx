// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
        <Switch>
          <Route exact path="/" component={CocktailList} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {/* Add other routes as needed */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
