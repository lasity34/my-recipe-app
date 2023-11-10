import React, { useState, useEffect } from "react";
import CocktailCard from "./CocktailCard.jsx";
import './CocktailList.css';

function CocktailList() {
    const [cocktails, setCocktails] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/cocktails') // Changed this line
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Debugging line
                setCocktails(data);
            })
            .catch(error => {
                console.error("Error fetching cocktails:", error);
                setError(error.toString());
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="cocktail_list">
            {cocktails.map(cocktail => (
                <CocktailCard key={cocktail.id} cocktail={cocktail} />
            ))}
        </div>
    );
}

export default CocktailList;


   