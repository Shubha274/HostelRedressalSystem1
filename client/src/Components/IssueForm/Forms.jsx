import React, { useState, useEffect } from "react";
import "./forms.css";
import axios from "axios";
import Navbar from "../NavBar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { jwtDecode } from "jwt-decode";
const token = localStorage.getItem("token");
let role = null;

// Decode the token to get the role if the token exists
if (token) {
  try {
    const decodedToken = jwtDecode(token);
    role = decodedToken.role; // Extract the role from the decoded token
  } catch (error) {
    console.error("Invalid token", error);
  }
}
const Forms = ({ role }) => {
  const [formData, setFormData] = useState({
    name: "",
    roomNo: "",
    issueDescription: "",
  });
  const [isListening, setIsListening] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [recognitionError, setRecognitionError] = useState("");

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
    return () => {
      recognition.stop();
    };
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
        "http://localhost:8080/api/issues",
        formData
      );
      console.log("Issue submitted:", response.data);
      alert("Issue submitted successfully!");
    } catch (error) {
      console.error("Error submitting issue:", error);
      alert("Failed to submit issue.");
    }

    setFormData({
      name: "",
      roomNo: "",
      issueDescription: "",
    });
  };

  return (
    <div className="container">
      {/* <Navbar />;{token && <Sidebar role={role} />} */}
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
