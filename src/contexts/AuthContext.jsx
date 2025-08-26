import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage("isLoggedIn", false);
  const navigate = useNavigate();

  // 로그인 함수
  const login = () => {
    setIsAuthenticated(true);
    navigate("/menu");
  };

  // 로그아웃 함수
  const logout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
