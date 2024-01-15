import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { fetchCocktails } from "../../api/Cocktail";

export default function Header() {
  const [cocktailOfTheDay, setCocktailOfTheDay] = useState(null);

  useEffect(() => {
    fetchCocktails()
      .then((cocktails) => {
        if (cocktails && cocktails.length > 0) {
          setCocktailOfTheDay(cocktails[0]);
        }
      })
      .catch((error) => console.error("Error fetching cocktails:", error));
  }, []);

  return (
    <div className="header_container">
      <nav className="navbar">
        <div className="nav-child">
          <ul className="dropdown-names">
            <li className="nav-item">
              <a href="/discover" className="nav-link">
                Discover
              </a>
            </li>
            <li className="nav-item">
              <a href="/my-cocktails" className="nav-link">
                My Cocktails
              </a>
            </li>
            <div className="title_container">
              <img src="./images/logo.png" alt="" />
            </div>
            <li className="nav-item">
              <a href="/sign-up" className="nav-link">
                Signup
              </a>
            </li>
            <li className="nav-item">
              <a href="/login" className="auth-link">
                Login
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="cocktail-day-container">
        {cocktailOfTheDay && (
          <div className="cocktail-details">
            <h2>Cocktail of the Day</h2>
            <img
              src={cocktailOfTheDay.image_url}
              alt={cocktailOfTheDay.title}
            />
            <p className="cocktail-title">{cocktailOfTheDay.title}</p>
          </div>
        )}
      </div>
      <div className="search-container">
        <button className="search-button search-button-left">Search</button>
        <input type="text" name="" id="" placeholder="Search Cocktails" />
        <button className="search-button search-button-right">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </button>
      </div>
    </div>
  );
}
