import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSearch,
  faCocktail,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

export default function Header() {
  return (
    <div className="header_container">
      <div className="title_container">
        <h2 className="header_title">The Boozy Blender</h2>
        <FontAwesomeIcon icon={faCocktail} />
      </div>

      <div className="search-container">
        <div>
          <button className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input type="text" name="" id="" placeholder="Search Cocktails" />
        </div>
        <hr className="divider" />
        <div className="user-container">
        <FontAwesomeIcon icon={faUser} />
        <a href="/login" className="auth-link">Login</a>
        <span> | </span>
        <a href="/signup" className="auth-link">Signup</a>
      </div>
      </div>
    </div>
  );
}
