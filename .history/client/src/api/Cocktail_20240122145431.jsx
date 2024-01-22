// api/cocktails.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://boozy-benders.onrender.com/api";

export const fetchCocktails = () => {
    return axios.get(`${BASE_URL}/cocktails`)
        .then(response => response.data)
        .catch(error => {
            console.log("Error fetching cocktails:", error);
            throw error;
        });
};

export const fetchCocktailDetails = (id) => {
    return axios.get(`${BASE_URL}/cocktails/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.log("Error fetching cocktail details:", error);
            throw error;
        });
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
