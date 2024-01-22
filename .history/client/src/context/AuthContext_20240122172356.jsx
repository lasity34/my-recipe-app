import React, { createContext, useState, useContext, useEffect } from 'react';
import { checkAuth } from '../api/Cocktail'; // Ensure this path is correct

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUser(username);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const authData = await checkAuth();
        if (authData.isLoggedIn) {
          setUser(authData.username);
        } else {
          // Handle the case where the user is not logged in
          // Possibly reset the user state or perform other actions
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setUser(null); // Reset user state in case of an error
      }
    };
  
    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
