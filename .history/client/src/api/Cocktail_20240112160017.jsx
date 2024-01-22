// api/cocktails.js
const BASE_URL = "https://boozy-benders.onrender.com/api";

export const fetchCocktails = () => {
    return fetch(`${BASE_URL}/cocktails`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
};

export const fetchCocktailDetails = (id) => {
    return fetch(`${BASE_URL}/cocktails/${id}`)
        .then(response => response.json());
};
