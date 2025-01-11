import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import "regenerator-runtime/runtime";

// Importing components
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

  // States
  const [transcript, setTranscript] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");

  // SpeechRecognition API setup
  useEffect(() => {
    const recognition = new window.SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const newTranscript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTranscript(newTranscript);

      // Redirect logic based on transcript
      if (newTranscript.toLowerCase().includes("go to home")) {
        setRedirectUrl("/home");
      } else if (newTranscript.toLowerCase().includes("go to blog")) {
        setRedirectUrl("/blog");
      } else if (newTranscript.toLowerCase().includes("go to contact")) {
        setRedirectUrl("/contact");
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended. Restarting...");
      recognition.start(); // Restart listening automatically
    };

    recognition.start(); // Start listening
    console.log("Speech recognition started");

    // Cleanup on component unmount
    return () => recognition.stop();
  }, []);

  // Redirect if redirectUrl is set
  if (redirectUrl) {
    return <Navigate to={redirectUrl} />;
  }

  return (
    <>
      <Router>
        <div id="links">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="app">
          <div className="main-content">
            <Routes>
              <Route path="/chart" element={<Chart />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
        </div>
      </Router>
      <p id="transcript">Transcript: {transcript}</p>
      <button
        onClick={() => {
          const recognition = new window.SpeechRecognition();
          recognition.start();
        }}
      >
        Start Listening
      </button>
    </>
  );
};

export default App;
