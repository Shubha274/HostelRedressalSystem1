import React, { createContext, useState } from "react";

import { jwtDecode } from "jwt-decode";
const INITIAL_STATE = { user: null, isFetching: false, error: false };
// Create the Auth Context
const AuthContext = createContext(INITIAL_STATE);

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const logout = async (inputs) => {
    const res = await axios.post("/auth/logout");
    setCurrentUser(null);
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentuser]);
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
// Custom hook to use Auth Context
