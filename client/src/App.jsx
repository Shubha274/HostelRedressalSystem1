import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import StudentDashboard from "./Components/StudentDashboard/StudentDashboard";
import ChatbotAdm from "./Components/ChatbotAdm/ChatbotAdm";
import RoleBasedTable from "./Components/Tables/RoleBasedTable";
import ChatbotWar from "./Components/ChatbotWar/ChatbotWar";
import ChatbotHeadWar from "./Components/ChatbotHeadWar/ChatbotHeadWar";
import SignIn from "./Components/SignPage/SignIn";
import StudentDashboard from "./Components/StudentDashboard/StudentDboard";
import WardenDboard from "./Components/WardenDashboard/WardenDboard";
import AdminDboard from "./Components/AdminDashboard/AdminDboard";

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

  return (
    <Router>
      <Routes>
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

export default App;
