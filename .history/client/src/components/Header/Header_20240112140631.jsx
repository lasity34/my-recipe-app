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
          <input type="text" name="" id="" placeholder="Search Cocktails" />
          <button className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <hr className="divider" />
        
      </div>
    </div>
  );
}
