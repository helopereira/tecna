import React, { createContext, useState, useEffect } from 'react';
import useResponse from '@/pages/api/useResponse';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { usuarios } = useResponse(); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
    }
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user from localStorage', error);
        setUser(null); 
      }
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    if (isAuthenticated && user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user'); 
    }
  }, [isAuthenticated, user]);

  const activeUser = usuarios.find(item => item.email === user);

  const login = (user) => {
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null); 
    localStorage.removeItem('user'); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, activeUser }}>
      {children}
    </AuthContext.Provider>
  );
};