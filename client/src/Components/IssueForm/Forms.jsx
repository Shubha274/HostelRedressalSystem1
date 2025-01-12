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

  const [errorMessage, setErrorMessage] = useState(""); // Error message for validation
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const [assignedPriority, setAssignedPriority] = useState(""); // Priority dynamically assigned
  const [isListening, setIsListening] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [recognitionError, setRecognitionError] = useState("");
  const [role, setRole] = useState(null); // Role from token
  const [username, setUsername] = useState(null); // Username from token

  // Define keyword-priority mappings
  const keywordPriorityMap = {
    electricity: "High",
    water: "High",
    maintenance: "Medium",
    cleaning: "Low",
    "room issue": "Medium",
    health: "High", // Added health as high priority
    others: "Low",
  };

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

  const validateTopic = (value) => {
    const hasNumbers = /\d/; // Regex to check for numeric values
    const wordCount = value.trim().split(/\s+/).length; // Count words
    if (hasNumbers.test(value)) {
      return "Topic cannot contain numeric values.";
    }
    if (wordCount > 5) {
      return "Topic cannot exceed 5 words.";
    }
    return ""; // No errors
  };

  const validateDescription = (value) => {
    const hasOnlyNumbers = /^\d+$/; // Regex to check if only numbers
    if (hasOnlyNumbers.test(value)) {
      return "Description cannot contain only numeric values.";
    }
    return ""; // No errors
  };

  const validateRoomNo = (value) => {
    const roomNo = Number(value);
    if (isNaN(roomNo)) {
      return "Room number must be a valid number.";
    }
    if (roomNo >= 400) {
      return "Room number must be less than 400.";
    }
    return ""; // No errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let validationError = "";
    if (name === "name") {
      validationError = validateTopic(value);
    } else if (name === "issueDescription") {
      validationError = validateDescription(value);
    } else if (name === "roomNo") {
      validationError = validateRoomNo(value);
    }

    setErrorMessage(validationError); // Set error message if validation fails
    if (!validationError) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Keyword-based priority determination
  const determinePriority = (name, description) => {
    const combinedText = `${name} ${description}`.toLowerCase();

    for (const keyword in keywordPriorityMap) {
      if (combinedText.includes(keyword)) {
        return keywordPriorityMap[keyword];
      }
    }

    return "Low"; // Default priority if no keyword matches
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submission
    const topicError = validateTopic(formData.name);
    const descriptionError = validateDescription(formData.issueDescription);
    const roomNoError = validateRoomNo(formData.roomNo);
    if (topicError || descriptionError || roomNoError) {
      setErrorMessage(topicError || descriptionError || roomNoError);
      return;
    }

    // Determine priority based on keywords
    const priority = determinePriority(formData.name, formData.issueDescription);
    setAssignedPriority(priority); // Display priority in UI

    try {
      const response = await axios.post("http://localhost:8080/api/issues/create", {
        ...formData,
        priority, // Add dynamically assigned priority
        username,
        role,
      });

      console.log("Issue submitted:", response.data);
      setSuccessMessage("Issue submitted successfully!");
      setErrorMessage(""); // Clear error message

      // Reset the form
      setFormData({
        name: "",
        roomNo: "",
        issueDescription: "",
      });
    } catch (error) {
      console.error("Error submitting issue:", error);
      setErrorMessage("Failed to submit issue. Please try again.");
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
              placeholder="Enter a number less than 400"
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

        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Error Message */}

        <button
          type="button"
          onClick={startListening}
          disabled={isListening}
          aria-label="Start voice input"
        >
          {isListening ? "Listening..." : "Start Listening"}
        </button>

        {recognitionError && <p className="error-message">{recognitionError}</p>}

        <button type="submit" aria-label="Submit issue">
          Generate Issue
        </button>
      </form>

      {successMessage && (
        <p className="success-message">
          {successMessage} Priority assigned: <strong>{assignedPriority}</strong>
        </p>
      )}
    </div>
  );
};

export default Forms;
