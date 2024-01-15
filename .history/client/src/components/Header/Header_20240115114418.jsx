import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { fetchCocktails } from "../../api/Cocktail";

export default function Header() {

  const [cocktailOfTheDay, setCocktailOfTheDay] = useState(null);

  useEffect(() => {
    fetchCocktails()
      .then(cocktails => {
        if(cocktails && cocktails.length > 0) {
          // Set the first cocktail as the cocktail of the day
          setCocktailOfTheDay(cocktails[0]);
        }
      })
      .catch(error => console.error('Error fetching cocktails:', error));
  }, []);


  return (
    <div className="header_container">
      <div className="title_container">
        <h2 className="header_title">The Boozy Blender</h2>
      </div>
    <div className="cocktail-day-container">

    </div>
      <div className="search-container">
      <button className="search-button search-button-left">
          Search
        </button>
        <input type="text" name="" id="" placeholder="Search Cocktails" />
        <button className="search-button search-button-right">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </button>
      </div>
    </div>
  );
}