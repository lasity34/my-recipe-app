// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { checkAuth } from '../api/Cocktail';

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
        }
      } catch (error) {
        console.error('Error checking login status:', error);
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
