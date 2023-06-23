import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [voter, setVoter] = useState([]);

  const login = (userData) => {
    // Perform login logic
    // Set the user data after successful login
    setVoter(userData);
  };

  const logout = () => {
    // Perform logout logic
    // Clear the user data
    setVoter([]);
  };

  return (
    <AuthContext.Provider value={{ voter, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
