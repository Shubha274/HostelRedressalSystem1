import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Dashboards = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token, redirect to login
      navigate("/login");
      return;
    }

    try {
      // Decode the token to extract the role
      const decodedToken = jwtDecode(token);
      const { role } = decodedToken;

      // Navigate to the appropriate dashboard based on the role
      switch (role) {
        case "student":
          navigate("/student-dashboard");
          break;
        case "warden":
          navigate("/warden-dashboard");
          break;
        case "admin":
          navigate("/admin-dashboard");
          break;
        default:
          // If role is invalid or unknown, logout the user
          localStorage.removeItem("token");
          navigate("/login");
          break;
      }
    } catch (error) {
      // Handle errors (e.g., invalid token)
      console.error("Error decoding token:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  return null; // No UI needed, as it redirects based on the role
};

export default Dashboards;
