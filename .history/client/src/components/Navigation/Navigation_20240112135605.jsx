
import React, { useState, useEffect} from "react";
import "./Navigation.css";
export default function Navbar() {

    const [countries, setCountries] = useState([])
 

    useEffect(() => {
        // fetch countries
        fetch('https://boozy-benders.onrender.com/api/countries')
          .then(response => response.json())
          .then(data => setCountries(data));
    
        // fetch ingredients
        // fetch('/api/ingredients')
        //   .then(response => response.json())
        //   .then(data => setIngredients(data));
    
        // fetch ratings - assuming ratings are predefined, for example 1-5
        // setRatings([1, 2, 3, 4, 5]);
      }, []);

    return (
        <nav className="navbar">
          <div className="nav-child">
        <ul className="dropdown-names">
          <li className="nav-item">
            <a href="#" className="nav-link">Countries</a>
           
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">Ingredients</a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">Recently Added</a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">Top Rated</a>
          </li>
        </ul>
        </div>
      </nav>
    )


}