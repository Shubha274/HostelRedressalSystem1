import React, { useState, useEffect } from "react";
import "./forms.css";
import axios from "axios";
import Navbar from "../NavBar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { jwtDecode } from "jwt-decode";
import ChatbotAdm from "../ChatbotStd/ChatbotAdm";

const Forms = () => {
  const [formData, setFormData] = useState({
    name: "",
    roomNo: "",
    issueDescription: "",
  });

  const [errors, setErrors] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [recognitionError, setRecognitionError] = useState("");
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";
  }

  useEffect(() => {
    // Load form data and errors from localStorage
    const savedFormData = JSON.parse(localStorage.getItem("formData")) || {
      name: "",
      roomNo: "",
      issueDescription: "",
    };
    const savedErrors = JSON.parse(localStorage.getItem("errors")) || {};
    setFormData(savedFormData);
    setErrors(savedErrors);

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role);
        setUsername(decodedToken.userId);
      } catch (error) {
        console.error("Invalid token", error);
        alert("Session expired. Please log in again.");
        window.location.href = "/login";
      }
    }
  }, []);

  const validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount > 5) {
        error = "Topic must not exceed 5 words.";
      } else if (!/^[a-zA-Z\s]*$/.test(value)) {
        error = "Topic must contain only alphabets.";
      }
    } else if (name === "issueDescription") {
      if (!/^[a-zA-Z0-9\s]*$/.test(value)) {
        error = "Description must contain only alphanumeric characters.";
      }
    } else if (name === "roomNo") {
      if (!/^\d*$/.test(value)) {
        error = "Room No must contain only digits.";
      } else if (Number(value) > 400 || Number(value) < 1) {
        error = "Room No must be between 1 and 400.";
      }
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    // Update errors
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors, [name]: error };
      if (!error) {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Save to localStorage
    localStorage.setItem(
      "formData",
      JSON.stringify({ ...formData, [name]: value })
    );
    localStorage.setItem("errors", JSON.stringify(errors));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error);
    if (
      hasErrors ||
      !formData.name ||
      !formData.issueDescription ||
      (role === "student" && !formData.roomNo)
    ) {
      alert(
        "Please resolve all errors and complete the form before submitting."
      );
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/issues/create", {
        ...formData,
        username,
        role,
      });

      alert("Issue submitted successfully!");
      setFormData({
        name: "",
        roomNo: "",
        issueDescription: "",
      });
      setErrors({});
      localStorage.removeItem("formData");
      localStorage.removeItem("errors");
    } catch (error) {
      console.error("Error submitting issue:", error);
      alert("Failed to submit issue. Please try again.");
    }
  };

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
            : transcript,
      }));

      localStorage.setItem(
        "formData",
        JSON.stringify({
          ...formData,
          [focusedField]:
            focusedField === "issueDescription"
              ? formData[focusedField] + " " + transcript
              : transcript,
        })
      );
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

  return (
    <div className="container">
      <Navbar />
      <Sidebar />
      <ChatbotAdm />
      <h2>Issue Generation Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Topic:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="At max 5 words"
            onFocus={() => setFocusedField("name")}
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
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
            {errors.roomNo && <p className="error-message">{errors.roomNo}</p>}
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
            rows="4"
            required
          />
          {errors.issueDescription && (
            <p className="error-message">{errors.issueDescription}</p>
          )}
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
