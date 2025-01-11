import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import
import SignIn from "./Components/SignPage/SignIn";
import StudentDboard from "./Components/StudentDashboard/StudentDboard";
import WardenDboard from "./Components/WardenDashBoard/WardenDboard";
import AdminDboard from "./Components/AdminDashboard/AdminDboard";
import Forms from "./Components/IssueForm/Forms";
import ChatMessenger from "./Components/ChatApp/ChatMessenger";

const App = () => {
  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const isTokenExpired = decodedToken.exp * 1000 < Date.now();
      if (isTokenExpired) {
        localStorage.removeItem("token");
      } else {
        role = decodedToken.role;
      }
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<SignIn />} />

          {/* Redirect based on token and role */}
          <Route
            path="/"
            element={
              token ? (
                role === "student" ? (
                  <Navigate to="/student-dashboard" />
                ) : role === "warden" ? (
                  <Navigate to="/warden-dashboard" />
                ) : role === "admin" ? (
                  <Navigate to="/admin-dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Role-Specific Routes */}
          <Route
            path="/student-dashboard"
            element={
              token && role === "student" ? (
                <StudentDboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/warden-dashboard"
            element={
              token && role === "warden" ? (
                <WardenDboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              token && role === "admin" ? (
                <AdminDboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Additional Routes */}
          <Route
            path="/issue-form"
            element={token ? <Forms /> : <Navigate to="/login" />}
          />
          <Route
            path="/chat-app"
            element={token ? <ChatMessenger /> : <Navigate to="/login" />}
          />

          {/* Fallback Route */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
