import React from 'react';
import './CocktailModal.css'; // You'll create this CSS file to style the modal

const CocktailModal = ({ isOpen, onClose, cocktail }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{cocktail.title}</h2>
        <img src={cocktail.image_url} alt={cocktail.title} />
        <p>{cocktail.description}</p>
        <p>Country: {cocktail.country_name}</p>
        <div className="ingredients">
          {cocktail.ingredients.map((ingredient, index) => (
            <span key={index} className="ingredient-tag">{ingredient.name} - {ingredient.quantity}</span>
          ))}
        </div>
      </div>
    </div>
  );
};


export default CocktailModal;
