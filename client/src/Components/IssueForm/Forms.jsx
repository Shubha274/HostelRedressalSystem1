import React, { useState, useEffect } from "react";
import "./forms.css";
import axios from "axios";
import Navbar from "../NavBar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import jwtDecode from "jwt-decode";
import ChatbotAdm from "../ChatbotStd/ChatbotAdm";

const Forms = () => {
  const [formData, setFormData] = useState({
    name: "",
    roomNo: "",
    issueDescription: "",
  });
  const [isListening, setIsListening] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [recognitionError, setRecognitionError] = useState("");
  const [role, setRole] = useState(null); // Role from token
  const [username, setUsername] = useState(null); // Username from token

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return <p>Sorry, your browser does not support speech recognition.</p>;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-IN";

  const startListening = () => {
    if (!focusedField) {
      alert("Please focus on a field to start voice input.");
      return;
    }

    setIsListening(true);
    setRecognitionError("");
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setFormData((prevData) => ({
        ...prevData,
        [focusedField]:
          focusedField === "issueDescription"
            ? prevData[focusedField] + " " + transcript
            : transcript, // Replace for name and roomNo; append for issueDescription
      }));
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setRecognitionError("Speech recognition failed. Please try again.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role); // Set the role from the token
        setUsername(decodedToken.userId); // Set the username from the token
      } catch (error) {
        console.error("Invalid token", error);
        alert("Session expired. Please log in again.");
        // Redirect to login if token is invalid
        window.location.href = "/login";
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/issues/create",
        {
          ...formData,
          username, // Send the username extracted from the token
          role, // Include role for validation
        }
      );

      console.log("Issue submitted:", response.data);
      alert("Issue submitted successfully!");

      // Reset the form
      setFormData({
        name: "",
        roomNo: "",
        issueDescription: "",
      });
    } catch (error) {
      console.error("Error submitting issue:", error);
      alert("Failed to submit issue. Please try again.");
    }
  };

  return (
    <div className="container">
      <Navbar />
      <Sidebar />
      <ChatbotAdm />
      <h2>Issue Generation Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocusedField("name")}
            required
          />
        </div>

        {role === "student" && (
          <div className="form-group">
            <label htmlFor="roomNo">Room No:</label>
            <input
              type="text"
              id="roomNo"
              name="roomNo"
              value={formData.roomNo}
              onChange={handleChange}
              onFocus={() => setFocusedField("roomNo")}
              required={role === "student"}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="issueDescription">Description of Issue:</label>
          <textarea
            id="issueDescription"
            name="issueDescription"
            value={formData.issueDescription}
            onChange={handleChange}
            onFocus={() => setFocusedField("issueDescription")}
            onInput={handleInput}
            rows="4"
            required
          />
        </div>

        <button
          type="button"
          onClick={startListening}
          disabled={isListening}
          aria-label="Start voice input"
        >
          {isListening ? "Listening..." : "Start Listening"}
        </button>

        {recognitionError && (
          <p className="error-message">{recognitionError}</p>
        )}

        <button type="submit" aria-label="Submit issue">
          Generate Issue
        </button>
      </form>
    </div>
  );
};

export default Forms;
