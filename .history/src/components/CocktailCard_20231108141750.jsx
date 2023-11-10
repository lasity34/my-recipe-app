
import './CocktailCard.css';

import React from "react";


function CocktailCard({ cocktail }) {


    return (
        <div className="cocktail_card">
            <img src={cocktail.image_url} alt={cocktail.title} className="cocktail_image"/>
            <div className="cocktail_info">
                <h2>{cocktail.title}</h2>
                <p>{cocktail.description}</p>
            </div>
        </div>
    )
}

export default CocktailCard