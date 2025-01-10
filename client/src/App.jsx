<<<<<<< HEAD
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import StudentDashboard from "./Components/StudentDashboard/StudentDashboard";
import ChatbotAdm from "./Components/ChatbotAdm/ChatbotAdm";
import RoleBasedTable from "./Components/Tables/RoleBasedTable";
import ChatbotWar from "./Components/ChatbotWar/ChatbotWar";
import ChatbotHeadWar from "./Components/ChatbotHeadWar/ChatbotHeadWar";
=======

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
>>>>>>> ced039fcca303885156bd73553557a8916d14ad5
import SignIn from "./Components/SignPage/SignIn";
import StudentDashboard from "./Components/StudentDashboard/StudentDboard";
import WardenDboard from "./Components/WardenDashboard/WardenDboard";
import AdminDboard from "./Components/AdminDashboard/AdminDboard";

<<<<<<< HEAD
function App() {
  const [role, setRole] = useState("student");
  const [status, setStatus] = useState("Pending");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Check token expiration
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          setToken(null);
          setUserRole(null);
        } else {
          setUserRole(decodedToken.role);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setToken(null);
        setUserRole(null);
      }
    } else {
      setUserRole(null);
    }
  }, [token]);

  const handleTokenUpdate = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const getDashboardPath = () => {
    switch (userRole) {
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
=======
const App = () => {
  const token = localStorage.getItem("token");
  let role = null;

  // Decode the token to get the role if the token exists
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role; // Extract the role from the decoded token
    } catch (error) {
      console.error("Invalid token", error);
    }
  }
>>>>>>> ced039fcca303885156bd73553557a8916d14ad5

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Navigate to={`/${role}-dashboard`} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
<<<<<<< HEAD
        <Route path="/login" element={<SignIn onTokenUpdate={handleTokenUpdate} />} />
        <Route
          path="/student-dashboard"
          element={userRole === "student" ? <StudentDashboard  /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/warden-dashboard"
          element={userRole === "warden" ? <WardenDboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/admin-dashboard"
          element={userRole === "admin" ? <AdminDboard /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
      <div className="controls">
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="warden">Warden</option>
          </select>
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>
        </label>
      </div>
      <StudentDashboard />
      <ChatbotHeadWar />
      <ChatbotWar />
      <ChatbotAdm />
      <RoleBasedTable role={role} status={status} />
    </Router>
  );
}
=======
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/student-dashboard"
          element={
            role === "student" ? <StudentDboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/warden-dashboard"
          element={
            role === "warden" ? <WardenDboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            role === "admin" ? <AdminDboard /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

>>>>>>> ced039fcca303885156bd73553557a8916d14ad5

export default App;
