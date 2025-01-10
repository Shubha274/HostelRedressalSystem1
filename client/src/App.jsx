// React App for BV Hostel Portal

import React, { useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  redirect,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import
import SignIn from "./Components/SignPage/SignIn";
import StudentDboard from "./Components/StudentDashboard/StudentDboard";
import WardenDboard from "./Components/WardenDashBoard/WardenDboard";
import AdminDboard from "./Components/AdminDashboard/AdminDboard";
import Forms from "./Components/IssueForm/Forms";
import ChatMessenger from "./Components/ChatApp/ChatMessenger";
import Dashboards from "./Components/Dasboard/Dashboards";
import Sidebar from "./Components/Sidebar/Sidebar";
import Chart from "./Components/Chartss/Chart";
import Blog from "./Components/Voice/Blog";
import Contact from "./Components/Voice/Contact";
import Home from "./Components/Voice/Home";
import NewBlogPost from "./Components/Voice/NewBlogPost";
import SpeechRecognition ,{useSpeechRecognition} from "react-speech-recognition";

const App = () => {
  const token = localStorage.getItem("token");
  const commands=[
    {
      command:["Go to *","Open *"],
      callback:(redirect)=>setRedirectUrl(redirectPage),
    },
  ];
  const {transcript}=useSpeechRecognition({commands});
  const [redirectUrl,setRedirectUrl]=useState("");
  let role = null;
  
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role; // Extract the role from the decoded token
      console.log("Decoded Role:", role); // Debugging log
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  return (
    <Router>
      <div className="app">
        <div className="main-content">
          <Routes>
            {/* Route for Login */}
            {/* <Route
              path="/"
              element={
                token ? (
                  <Navigate to={`/${role}-dashboard`} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            /> */}
            {/* Default Route*/}
            {/* <Route
              path="/"
              element={
                token && role ? (
                  <Navigate to="/student-dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            /> */}
            {/* <Route path="/login" element={<SignIn />} /> */}
            {/* Student Dashboard */}
            {/* <Route
              path="/student-dashboard"
              element={
                role === "student" ? (
                  <StudentDboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            /> */}

            {/* Warden Dashboard */}
            {/* <Route
              path="/warden-dashboard"
              element={
                role === "warden" ? <WardenDboard /> : <Navigate to="/login" />
              } */}
            {/* /> */}
            {/* Admin Dashboard */}
            {/* <Route
              path="/admin-dashboard"
              element={
                role === "admin" ? <AdminDboard /> : <Navigate to="/login" />
              } */}
            {/* /> */}
            {/* Additional Routes */}
            {/* <Route path="/issue-form" element={<Forms />} />
            <Route path="/chat-app" element={<ChatMessenger />} />
            <Route path="/dashboard" element={<Dashboards />} /> */}
            <Route path="/chart" element={<Chart />} />
            {/* <Route path="/Blog" element={<Blog />} /> 
            <Route path="/Contact" element={<Contact />} /> 
            <Route path="/Home" element={<Home />} /> 
            <Route path="/NewBlogPost" element={<NewBlogPost />} />   */}
            {/* <Route path="/student-dashboard" element={<StudentDboard />} /> */}
            {/* Fallback Route */}
            {/* <Route path="*" element={<h1>404 - Page Not Found</h1>} /> */}
          </Routes>
          {/* <p id="transcript">Transcript:{transcript}</p> */}
        {/* <button onClick={SpeechRecognition.stopListening}>Start</button> */}
        </div>
      </div>
    </Router>
  );
};

export default App;
