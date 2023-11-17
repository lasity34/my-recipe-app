import React, { useRef, useEffect } from 'react';
import './CocktailModal.css';

const CocktailModal = ({ isOpen, onClose, cocktail }) => {
  const modalContent = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalContent.current && !modalContent.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content" ref={modalContent}>
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
