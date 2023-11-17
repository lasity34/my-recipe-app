
import './CocktailList.css';



import React, {useState, useEffect} from "react";
import CocktailCard from "../CocktailCard/CocktailCard.jsx";
import CocktailModal from '../CocktailModal/CocktailModal';

function CocktailList() {
    const [cocktails, setCocktails] = useState([]);

    useEffect(() => {
        fetch(`/api/cocktails`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();  // Change to text() for debugging purposes
        })
        .then(text => {
         
          return JSON.parse(text);  // Manually parse the text to JSON
        })
        .then(data => setCocktails(data))
        .catch(error => console.error("Error fetching cocktails:", error));
      
    }, [])


    return (
        <div className="cocktail_list">
            {cocktails.map(cocktail => (
                <CocktailCard key={cocktail.id} cocktail={cocktail} />
            ))}
        </div>
    )

}


export default CocktailList

   