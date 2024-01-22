// api/cocktails.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://boozy-benders.onrender.com/api";

export const fetchCocktails = () => {
    console.log("Base URL:", import.meta.env.VITE_API_BASE_URL);

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

export const signupUser = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/signup`, formData);
        if (response.status === 201) {
            return response.data; // Return the response data on successful signup
        } else {
            console.log("Response from server:", response);
            throw new Error('Signup failed');
        }
    } catch (error) {
        console.log(error); // Log the entire error object
        throw error; // Re-throw the error to be handled where signupUser is called
    }
};
