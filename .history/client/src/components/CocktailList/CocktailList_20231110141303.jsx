import './CocktailList.css';

import React, { useState, useEffect } from "react";
import CocktailCard from "../CocktailCard/CocktailCard.jsx";
import CocktailModal from '../CocktailModal/CocktailModal';

function CocktailList() {
    const [cocktails, setCocktails] = useState([]);
    const [selectedCocktail, setSelectedCocktail] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetch(`/api/cocktails`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();  // Directly parse the response to JSON
            })
            .then(data => setCocktails(data))
            .catch(error => console.error("Error fetching cocktails:", error));
    }, []);

    const openModal = (cocktail) => {
        setSelectedCocktail(cocktail);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="cocktail_list">
            {cocktails.map(cocktail => (
                <CocktailCard key={cocktail.id} cocktail={cocktail} onClick={() => openModal(cocktail)} />
            ))}
            {selectedCocktail && (
                <CocktailModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    cocktail={selectedCocktail}
                    // You'll need to pass the ingredients here if required
                />
            )}
        </div>
    );
}

export default CocktailList;

   