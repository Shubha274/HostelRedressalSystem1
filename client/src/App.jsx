import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import "regenerator-runtime/runtime";

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Home from "./Components/Voice/Home";
import Blog from "./Components/Voice/Blog";
import Contact from "./Components/Voice/Contact";

const App = () => {
  const commands = [
    {
      command: ["Go to *", "Open *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage.toLowerCase()),
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    // Normalize the redirect URL to match the route paths
    if (redirectUrl) {
      const normalizedPath = redirectUrl
        .replace(/\s+/g, "-") // Replace spaces with hyphens for multi-word paths
        .trim();
      setPath(normalizedPath);
    }
  }, [redirectUrl]);

  const [path, setPath] = useState("");

  useEffect(() => {
    // Clear the path after navigation
    if (path) {
      setTimeout(() => setPath(""), 1000); // Delay to ensure navigation happens
    }
  }, [path]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <Router>
      <div id="links">
        <Link to="/home">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="app">
        <div className="main-content">
          {path && <Navigate to={`/${path}`} replace />} {/* Navigate based on voice command */}
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </div>
      </div>

      <div>
        <p id="transcript">Transcript: {transcript}</p>
        <button
          onClick={() =>
            SpeechRecognition.startListening({ continuous: true, language: "en-US" })
          }
        >
          Start Voice Recognition
        </button>
        <button onClick={SpeechRecognition.stopListening}>Stop Voice Recognition</button>
      </div>
    </Router>
  );
};

export default App;
