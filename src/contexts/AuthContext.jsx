import React, { createContext, useContext, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage("isLoggedIn", false);
  const navigate = useNavigate();

  const login = useCallback(() => {
    setIsAuthenticated(true);
    navigate("/menu");
  }, [navigate, setIsAuthenticated]);
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    navigate("/");
  }, [navigate, setIsAuthenticated]);

  const value = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
