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


export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
        
        if (response.status === 200) {
            return response.data; // Return the response data on successful login
        } else {
            console.log("Response from server:", response);
            throw new Error('Login failed');
        }
    } catch (error) {
        console.log("Error during login:", error);
        throw error; // Re-throw the error to be handled where loginUser is called
    }
};



export const logoutUser = async () => {
    return axios.post(`${BASE_URL}/auth/logout`)
        .then(response => response.data)
        .catch(error => {
            console.log("Error during logout:", error);
            throw error;
        });
};

export const checkAuth = async () => {
    return await axios.get(`${BASE_URL}/auth/check-auth`)
        .then(response => response.data)
        .catch(error => {
            console.log("Error checking auth status:", error);
            throw error;
        });
};


xport const uploadImage = async (file, userId, imageType) => {
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await axios.post(`${BASE_URL}/images/upload`, formData, {
        params: { userId, imageType }, // Passing userId and imageType as query parameters
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        return response.data.imageUrl; // Return the image URL from the server
      } else {
        console.error('Upload failed:', response.statusText);
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
