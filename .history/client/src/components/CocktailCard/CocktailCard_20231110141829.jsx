import './CocktailCard.css';

import React from "react";

function CocktailCard({ cocktail, onClick }) {
    // Pass the onClick event to the main div of the card
    return (
        <div className="cocktail_card" onClick={() => onClick(cocktail)}>
            <img src={cocktail.image_url} alt={cocktail.title} className="cocktail_image"/>
            <div className="cocktail_info">
                <h3>{cocktail.title}</h3>
                <p>{cocktail.description}</p>
            </div>
        </div>
    );
}

export default CocktailCard;
