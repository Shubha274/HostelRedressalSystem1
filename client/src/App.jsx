import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import jwtDecode from "jwt-decode"; // Correct import of jwt-decode
import { useState, useEffect } from "react";
import SignIn from "./Components/SignPage/SignIn";
import StudentDboard from "./Components/StudentDashboard/StudentDboard";
import WardenDboard from "./Components/WardenDashboard/WardenDboard";
import AdminDboard from "./Components/AdminDashboard/AdminDboard";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Check token expiration
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          setToken(null);
          setRole(null);
        } else {
          setRole(decodedToken.role); // Set the role from the decoded token
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setToken(null);
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, [token]);

  // Function to handle token updates after login
  const handleTokenUpdate = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // Helper function to determine the dashboard path
  const getDashboardPath = () => {
    switch (role) {
      case "student":
        return "/student-dashboard";
      case "warden":
        return "/warden-dashboard";
      case "admin":
        return "/admin-dashboard";
      default:
        return "/login";
    }
  };

  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={
            token ? (
              <Navigate to={getDashboardPath()} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Login route with token update callback */}
        <Route
          path="/login"
          element={<SignIn onTokenUpdate={handleTokenUpdate} />}
        />

        {/* Role-based protected routes */}
        <Route
          path="/student-dashboard"
          element={
            role === "student" ? (
              <StudentDboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/warden-dashboard"
          element={
            role === "warden" ? (
              <WardenDboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            role === "admin" ? (
              <AdminDboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
