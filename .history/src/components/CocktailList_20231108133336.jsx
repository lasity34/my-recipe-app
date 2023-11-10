
import './CocktailList.css';



import React, {useState, useEffect} from "react";
import CocktailCard from "./CocktailCard.jsx";

function CocktailList() {
    const [cocktails, setCocktails] = useState([]);

    useEffect(() => {
        fetch(`/api/cocktails`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
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

   