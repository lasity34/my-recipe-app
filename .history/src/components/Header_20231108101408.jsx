import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div>
      <h2>The Boozy Blender</h2>
      <div>
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
