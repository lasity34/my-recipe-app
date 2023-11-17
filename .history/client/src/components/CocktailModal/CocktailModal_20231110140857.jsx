import React from 'react';
import './Modal.css'; // You'll create this CSS file to style the modal

const Modal = ({ isOpen, onClose, cocktail, ingredients }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{cocktail.title}</h2>
        <img src={cocktail.image_url} alt={cocktail.title} />
        <p>{cocktail.description}</p>
        // Add more details about the cocktail here
        <div className="ingredients">
          {ingredients.map(ingredient => (
            <span className="ingredient-tag">{ingredient.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
