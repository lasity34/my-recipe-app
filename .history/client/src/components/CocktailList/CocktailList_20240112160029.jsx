import './CocktailList.css';

import React, { useState, useEffect } from "react";
import CocktailCard from "../CocktailCard/CocktailCard";
import CocktailModal from '../CocktailModal/CocktailModal';
import { fetchCocktailDetails } from '../../../api/Cocktail';


function CocktailList() {
    const [cocktails, setCocktails] = useState([]);
    const [selectedCocktail, setSelectedCocktail] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetchCocktails()
            .then(data => {
                setCocktails(data);
            })
            .catch(error => console.error("Error fetching cocktails:", error));
    }, []);

    const openModal = (cocktail) => {
        fetchCocktailDetails(cocktail.id)
            .then(data => {
                setSelectedCocktail(data);
                setModalOpen(true);
            })
            .catch(error => console.error("Error fetching cocktail details:", error));
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
                  
                />
            )}
        </div>
    );
}

export default CocktailList;

   