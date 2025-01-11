// React App for BV Hostel Portal

import React, { useCallback, useState } from "react";
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

const commands=[
  {
    command:["Go to *","Open"],
    callback:(redirectPage)=>setRedirectUrl(redirectPage),
  }
]
const {transcript}=useSpeechRecognition({commands});
// const [redirectUrl,setRedirectUrl]=useState("");
// const pages=["home","blog","contact"];
// const urls={
//   home:"/",
//   blog:"./Components/Voice/Blog",
//   contact:"./Components/Voice/Contact",
// }
// if(!SpeechRecognition.browserSupportsSpeechRecognition)
// {
//    return null;
// }
// let redirect="";
// if(redirectUrl)
// {
//   if(pages.includes(redirectUrl))
//   {
//     redirect=<Redirect to={urls[redirectUrl]}/>
//   }
//   else{
//     redirect=<p>Could not find page : {redirectUrl}</p>;
//   }
// }
return (
    <><><Router>
    <div id="links">
      <Link to="/">Home</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/contact">Contact</Link>
    </div>
    <div className="app">
      <div className="main-content">
        <Routes>
          {/* Route for Login */}
          {/* <Route
      path="/"
      element={token ? (
        <Navigate to={`/${role}-dashboard`} />
      ) : (
        <Navigate to="/login" />
      )} /> */}
          {/* <Route path="/login" element={<SignIn />} /> */}
          {/* Student Dashboard */}
          {/* <Route
      path="/student-dashboard"
      element={role === "student" ? (
        <StudentDboard />
      ) : (
        <Navigate to="/login" />
      )} /> */}
          {/* Warden Dashboard */}
          {/* <Route
      path="/warden-dashboard"
      element={role === "warden" ? (
        <WardenDboard />
      ) : (
        <Navigate to="/login" />
      )} /> */}
          {/* Admin Dashboard */}
          {/* <Route
      path="/admin-dashboard"
      element={role === "admin" ? (
        <AdminDboard />
      ) : (
        <Navigate to="/login" />
      )} /> */}
          {/* Additional Routes */}
          {/* <Route path="/issue-form" element={<Forms />} />
    <Route path="/chat-app" element={<ChatMessenger />} />
    <Route path="/dashboard" element={<Dashboards />} /> */}
          <Route path="/chart" element={<Chart />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/home" element={<Home />} />
          {redirect}
          {/* Fallback Route */}
          {/* <Route path="*" element={<h1>404 - Page Not Found</h1>} /> */}
        </Routes>
      </div>
    </div>
  </Router><p id="transcript">Transcript:{transcript}</p></>
  <button onClick={() => SpeechRecognition.startListening({ continuous: true, language: 'en-US' })}>
  Start
</button>
\</>
  );
};

export default App;
