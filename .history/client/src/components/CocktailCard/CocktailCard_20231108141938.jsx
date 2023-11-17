
import './CocktailCard.css';

import React from "react";


function CocktailCard({ cocktail }) {


    return (
        <div className="cocktail_card">
            <img src={cocktail.image_url} alt={cocktail.title} className="cocktail_image"/>
            <div className="cocktail_info">
                <h3>{cocktail.title}</h3>
                <p>{cocktail.description}</p>
            </div>
        </div>
    )
}

export default CocktailCard