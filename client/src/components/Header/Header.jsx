import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { fetchCocktails } from "../../api/Cocktail";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from 'react-router-dom';


export default function Header() {
  const [cocktailOfTheDay, setCocktailOfTheDay] = useState(null);
  const { user, logout } = useAuth();
  const location = useLocation();


  const handleLogout = () => {
    logout(); // Call the logout function from your Auth context
    navigate("/"); // Optionally redirect the user to the home page or login page
  };

  useEffect(() => {
    if (location.pathname === '/') {
      fetchCocktails()
        .then((cocktails) => {
          if (cocktails && cocktails.length > 0) {
            setCocktailOfTheDay(cocktails[0]);
          }
        })
        .catch((error) => console.error("Error fetching cocktails:", error));
    }
  }, [location.pathname]); // React to ch

  return (
    <div className="header_container">
    <nav className="navbar">
  <ul className="nav-group">
    <li className="nav-item">
      <a href="/discover" className="nav-link">Discover</a>
    </li>
    <li className="nav-item">
      <a href="/my-cocktails" className="nav-link">My Cocktails</a>
    </li>
  </ul>

  <div className="title_container">
    <img src="./images/logo.png" alt="" />
  </div>

  <ul className="nav-group">
    {user ? (
      <>
        <li className="nav-item">
          <a href="/profile" className="nav-link">Profile</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={handleLogout}>Logout</a>
        </li>
        <li className="nav-item">
          <span className="nav-link">Welcome {user.username}</span>
        </li>
      </>
    ) : (
      <>
        <li className="nav-item">
          <a href="/signup" className="nav-link">Signup</a>
        </li>
        <li className="nav-item">
          <a href="/login" className="nav-link">Login</a>
        </li>
      </>
    )}
  </ul>
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
