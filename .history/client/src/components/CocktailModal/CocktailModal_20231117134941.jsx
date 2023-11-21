import React, { useRef, useEffect } from "react";
import "./CocktailModal.css";

const CocktailModal = ({ isOpen, onClose, cocktail }) => {
  const modalContent = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalContent.current &&
        !modalContent.current.contains(event.target)
      ) {
        onClose();
      }
    };

    console.log(cocktail)

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content" ref={modalContent}>
        <h2 className="cocktail_title">{cocktail.title}</h2>
        <div className="modal_container">
          <div className="image_container">
            <img src={cocktail.image_url} alt={cocktail.title} />
          </div>
          <div className="info_container">
    <p className="description">{cocktail.description}</p>
    <p className="country">Country: {cocktail.country_name}</p>
    <div className="ingredients">
        <ul>
            {cocktail.ingredients.map((ingredient, index) => (
                <li key={index}>
                    <span className="name">{ingredient.name}</span> - <span>{ingredient.quantity}</span>
                </li>
            ))}
        </ul>
    </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default CocktailModal;
