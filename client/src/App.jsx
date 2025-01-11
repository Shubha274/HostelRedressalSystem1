import React, { useState } from "react";
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
  const [redirectUrl, setRedirectUrl] = useState("");

  // Voice commands configuration
  const commands = [
    {
      command: ["Go to *", "Open *"],
      callback: (redirectPage) => handleRedirect(redirectPage),
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });

  // Handle redirection based on spoken words
  const handleRedirect = (redirectPage) => {
    const normalizedPath = redirectPage
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-"); // Normalize the path
    if (["home", "blog", "contact"].includes(normalizedPath)) {
      setRedirectUrl(normalizedPath);
    } else {
      console.error(`Path "${redirectPage}" does not exist.`);
    }
  };

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
          {redirectUrl && <Navigate to={`/${redirectUrl}`} replace />} {/* Navigate to the route */}
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
