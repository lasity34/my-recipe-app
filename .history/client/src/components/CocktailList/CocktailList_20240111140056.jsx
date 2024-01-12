import './CocktailList.css';

import React, { useState, useEffect } from "react";
import CocktailCard from "../CocktailCard/CocktailCard";
import CocktailModal from '../CocktailModal/CocktailModal';

function CocktailList() {
    const [cocktails, setCocktails] = useState([]);
    const [selectedCocktail, setSelectedCocktail] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetch(`https://boozy-benders.onrender.com/api/cocktails`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();  // Get the response as text first for debugging
        })
        .then(data => {
            console.log("Raw data:", data);  // Log raw data
            return JSON.parse(data);  // Then parse the data as JSON
        })
        .then(data => {
            console.log("Parsed data:", data);  // Log parsed data
            setCocktails(data);
        })
        .catch(error => console.error("Error fetching cocktails:", error));
    
    }, []);

    const openModal = (cocktail) => {
        fetch(`https://boozy-benders.onrender.com/api/cocktails/${cocktail.id}`)
            .then(response => response.json())
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

   