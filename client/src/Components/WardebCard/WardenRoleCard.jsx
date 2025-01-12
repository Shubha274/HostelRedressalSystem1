import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import
import "./WardenRoleCard.css";

const getToken = () => localStorage.getItem("token"); // Fetch token from localStorage

const WardenRoleCard = () => {
  const [data, setData] = useState(null); // Issue data state
  const [isVisible, setIsVisible] = useState(true); // Visibility state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const token = getToken();

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const username = decodedToken.userId;

        // Fetch the latest issue for the user
        fetch(`http://localhost:8080/api/issues/${username}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch issue data");
            }
            return response.json();
          })
          .then((fetchedData) => setData(fetchedData))
          .catch((fetchError) => {
            console.error("Error fetching data:", fetchError);
            setError("Failed to load issue data.");
          });
      } catch (decodeError) {
        console.error("Error decoding token:", decodeError);
        setError("Invalid token. Please log in again.");
      }
    } else {
      console.error("No token found!");
      setError("User not authenticated.");
    }
  }, []);

  const handleDelete = () => {
    if (data) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this issue?"
      );
      if (!confirmDelete) return;

      fetch(`http://localhost:8080/api/issues/${data.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete the issue.");
          }
          setIsVisible(false);
          console.log("Issue deleted successfully:", data);
          alert("Issue deleted successfully!");
        })
        .catch((deleteError) => {
          console.error("Error deleting issue:", deleteError);
          alert("Failed to delete the issue.");
        });
    }
  };

  // Show error state
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Show loading state
  if (!data) {
    return <div className="loading-message">Loading...</div>;
  }

  // Hide card if not visible
  if (!isVisible) {
    return null;
  }

  // Destructure issue data
  const { iname, issueGenerated, issueSolved, issueStatus } = data || {};

  // Format the date for better readability

  return (
    <div className="card">
      <div className="card-content">
        <p className="highlighted-issue">{iname || "No issue available"}</p>
        <p className="highlighted-date">
          {issueGenerated || "Date not available"}
        </p>
        <p className="highlighted-date">
          {issueSolved || "Date not available"}
        </p>
        {/* <p className="text-style">
          {description || "No description provided."}
        </p> */}
        <div
          className={`status-box ${
            issueStatus === "resolved" || issueStatus === "solved"
              ? "resolved"
              : "pending"
          }`}
        >
          {issueStatus || "Status unknown"}
        </div>
      </div>
      <div className="delete-button-container">
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default WardenRoleCard;
