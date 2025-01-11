import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Blog from "./Components/Voice/Blog";
import Contact from "./Components/Voice/Contact";
import Home from "./Components/Voice/Home";

const App = () => {
  const [redirectUrl, setRedirectUrl] = useState("");

  const commands = [
    {
      command: ["Go to *", "Open *"],
      callback: (redirectPage) => {
        const formattedPage = redirectPage.toLowerCase().trim();
        setRedirectUrl(formattedPage);
      },
    },
  ];

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser does not support speech recognition.</p>;
  }

  // Map pages to routes
  const pageRoutes = {
    home: "/home",
    blog: "/blog",
    contact: "/contact",
  };

  // Handle redirection
  let redirectMessage = "";
  if (redirectUrl) {
    if (pageRoutes[redirectUrl]) {
      window.location.href = pageRoutes[redirectUrl];
    } else {
      redirectMessage = `Could not find the page: ${redirectUrl}`;
    }
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
      <div>
        <button
          onClick={() =>
            SpeechRecognition.startListening({ continuous: true, language: "en-US" })
          }
        >
          {listening ? "Listening..." : "Start Listening"}
        </button>
        <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
      </div>
      <p>Transcript: {transcript}</p>
      {redirectMessage && <p>{redirectMessage}</p>}
    </div>
  );
};

export default App;
