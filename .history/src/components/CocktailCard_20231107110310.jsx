
import React from "react";


function CocktailCard({ cocktail }) {


    return (
        <div className="cocktail-card">
            <img src={cocktail.image_url} alt={cocktail.title} className="cocktail_image"/>
            <div className="cocktail-info">
                <h2>{cocktail.title}</h2>
                <p>{cocktail.description}</p>
            </div>
        </div>
    )
}

export default CocktailCard