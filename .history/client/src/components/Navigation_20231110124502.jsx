
import React, { useState, useEffect} from "react";
import "./Navigation.css";
export default function Navbar() {

    const [countries, setCountries] = useState([])
    const [ ingredients, setIngredients] = useState([]);
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        // fetch countries
        fetch('/api/countries')
          .then(response => response.json())
          .then(data => setCountries(data));
    
        // fetch ingredients
        fetch('/api/ingredients')
          .then(response => response.json())
          .then(data => setIngredients(data));
    
        // fetch ratings - assuming ratings are predefined, for example 1-5
        setRatings([1, 2, 3, 4, 5]);
      }, []);

    return (
        <nav className="navbar">
          <div className="nav-child">

        
        <ul>
          <li className="nav-item">
            <a href="#" className="nav-link">Countries</a>
            <ul className="dropdown">
              {countries.map(country => (
                <li key={country.id} className="dropdown-item">{country.name}</li>
              ))}
            </ul>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">Ingredients</a>
            <ul className="dropdown">
              {ingredients.map(ingredient => (
                <li key={ingredient.id} className="dropdown-item">{ingredient.name}</li>
              ))}
            </ul>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">Ratings</a>
            <ul className="dropdown">
              {ratings.map(rating => (
                <li key={rating} className="dropdown-item">{rating} Stars</li>
              ))}
            </ul>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">About</a>
          </li>
        </ul>
        </div>
      </nav>
    )


}