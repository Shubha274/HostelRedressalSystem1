// StudentRoleCard.jsx
import React, { useState, useEffect } from 'react';
import './StudentRoleCard.css'; // Import the CSS file

// Simulating fetching data from the database
const fetchDataFromDatabase = () => {
  return {
    issue: "Switch is not working", // Example data
    issueCreatedTime: "Jan 10, 2025", // Example data
    description: "I'm facing this problem of Switch. It is not working.", // Example data for student
    status: "Pending", // Can be either "Pending" or "Resolved"
  };
};

const StudentRoleCard = () => {
  const [data, setData] = useState({});
  const [isVisible, setIsVisible] = useState(true); // State to toggle visibility of the card

  // Fetch data from the "database" on component mount
  useEffect(() => {
    const fetchedData = fetchDataFromDatabase();
    setData(fetchedData);
  }, []);

  const { issue, issueCreatedTime, description, status } = data;

  // Handler to delete the card
  const handleDelete = () => {
    setIsVisible(false);
    // Simulate deletion from the database if needed
    console.log("Card data deleted permanently:", data);
  };

  // Return nothing if the card is deleted
  if (!isVisible) return null;

  return (
    <div className="card">
      {/* Highlighted Issue (1st line) */}
      <p className="highlighted-issue">{issue}</p>

      {/* Issue Created Time (2nd line) */}
      <p className="highlighted-date">{issueCreatedTime}</p>

      {/* Issue Description (3rd line) */}
      <p className="text-style">{description}</p>

      {/* Status and Delete Button Row */}
      <div className="status-delete-row">
        <div className={`status-box ${status === 'Resolved' ? 'resolved' : 'pending'}`}>
          {status} {/* Displaying "Pending" or "Resolved" */}
        </div>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentRoleCard;
