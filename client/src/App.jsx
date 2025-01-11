// React App for BV Hostel Portal

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import "regenerator-runtime/runtime";

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import SignIn from "./Components/SignPage/SignIn";
import StudentDboard from "./Components/StudentDashboard/StudentDboard";
import WardenDboard from "./Components/WardenDashBoard/WardenDboard";
import AdminDboard from "./Components/AdminDashboard/AdminDboard";
import Forms from "./Components/IssueForm/Forms";
import ChatMessenger from "./Components/ChatApp/ChatMessenger";
import Dashboards from "./Components/Dasboard/Dashboards";
import Chart from "./Components/Chartss/Chart";
import Blog from "./Components/Voice/Blog";
import Contact from "./Components/Voice/Contact";
import Home from "./Components/Voice/Home";

const App = () => {
  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decoding JWT token
      role = decodedToken.role; // Extract the role from the decoded token
      console.log("Decoded Role:", role); // Debugging log
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  // Fallback for unsupported browsers (SpeechRecognition handling)
  const { browserSupportsSpeechRecognition } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    console.warn("Browser does not support speech recognition.");
  }
else{
  console.warn("Browsersupport speech recognition.");
}
  return (
    <Router>
      <div id="links">
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="app">
        <div className="main-content">
          <Routes>
            {/* Route for Login */}
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
            <Route path="/login" element={<SignIn />} />
            {/* Student Dashboard */}
            <Route
              path="/student-dashboard"
              element={
                role === "student" ? (
                  <StudentDboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {/* Warden Dashboard */}
            <Route
              path="/warden-dashboard"
              element={
                role === "warden" ? (
                  <WardenDboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {/* Admin Dashboard */}
            <Route
              path="/admin-dashboard"
              element={
                role === "admin" ? (
                  <AdminDboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {/* Additional Routes */}
            <Route path="/issue-form" element={<Forms />} />
            <Route path="/chat-app" element={<ChatMessenger />} />
            <Route path="/dashboard" element={<Dashboards />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/home" element={<Home />} />
            {/* Fallback Route */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
