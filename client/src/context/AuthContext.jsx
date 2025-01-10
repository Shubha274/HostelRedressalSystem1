import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const INITIAL_STATE = { user: null, isFetching: false, error: false };
// Create the Auth Context
const AuthContext = createContext(INITIAL_STATE);

// Auth Provider Component
export const AuthProvider = () => {
  const [state, dispatch] = useReducer(null);
  const [role, setRole] = useState(null);

  // Load token from localStorage on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        setToken(storedToken);
        setRole(decodedToken?.role); // Extract role from token
      } catch (error) {
        console.error("Invalid token:", error);
        setToken(null);
        setRole(null);
      }
    }
  }, []);

  // Login function
  const login = (newToken) => {
    try {
      const decodedToken = jwtDecode(newToken);
      setToken(newToken);
      setRole(decodedToken?.role);
      localStorage.setItem("token", newToken); // Persist token
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = () => useContext(AuthContext);
