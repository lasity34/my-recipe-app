import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import './Header.css'; 

export default function Header() {
  return (
    <div className="header_container">
      <h2>The Boozy Blender</h2>
      <div className="header_profile_search_container">
        <div className="search-container">
          <input type="text" name="" id="" placeholder="Search Cocktails" />
          <button className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <hr className="divider" />
          <div className="login-container">
            <FontAwesomeIcon icon={faUser} />
            <a href="/login" className="login-link">Login</a>
          </div>
        </div>
        
      </div>
    </div>
  );
}
