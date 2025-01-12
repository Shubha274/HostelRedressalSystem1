import React, { useState, useEffect } from "react";
import "./forms.css";
import axios from "axios";
import Navbar from "../NavBar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Forms = ({ role }) => {
  const [formData, setFormData] = useState({
    name: "",
    roomNo: "",
    issueDescription: "",
  });
  localStorage.setItem("token", token);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/issues/create",
        formData
      );
      console.log("Issue submitted:", response.data);

      // Show success message
      setSuccessMessage("Issue generated successfully!");

      // Reset form fields
      setFormData({
        name: "",
        roomNo: "",
        issueDescription: "",
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error submitting issue:", error);
      alert("Failed to submit issue.");
    }
  };

  return (
    <div className="container">
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
            rows="4"
          />
        </div>

        <button type="submit" aria-label="Submit issue">
          Generate Issue
        </button>
      </form>
      <Navbar />
      <Sidebar />
      {/* Display success message */}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default Forms;
