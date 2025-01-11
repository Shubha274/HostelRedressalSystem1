import React, { useState, useEffect } from 'react';
import './WardenRoleCard.css'; // Import the CSS file

// Simulating fetching data from the database
const fetchDataFromDatabase = () => {
  return {
    issue: "Switch is not working", // Example data
    issueCreatedTime: "Jan 10, 2025", // Example data
    description: "This issue is not solved by us.", // Example data for warden
    hostelName: "Shanta Sangam", // Example data for warden
    status: "Pending", // Can be either "Pending" or "Resolved"
  };
};

const WardenRoleCard = () => {
  const [data, setData] = useState({});
  const [isVisible, setIsVisible] = useState(true); // State to toggle visibility of the card

  // Fetch data from the "database" on component mount
  useEffect(() => {
    const fetchedData = fetchDataFromDatabase();
    setData(fetchedData);
  }, []);

  const { issue, issueCreatedTime, description, hostelName, status } = data;

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
      <div className="card-content">
        {/* Highlighted Issue (1st line) */}
        <p className="highlighted-issue">{issue}</p>

        {/* Hostel Name (above date) */}
        <p className="highlighted-hostel-name">{hostelName}</p>

        {/* Issue Created Time (2nd line) */}
        <p className="highlighted-date">{issueCreatedTime}</p>

        {/* Issue Description (3rd line) */}
        <p className="text-style">{description}</p>

        {/* Status Box */}
        <div className={`status-box ${status === 'Resolved' ? 'resolved' : 'pending'}`}>
          {status} {/* Displaying "Pending" or "Resolved" */}
        </div>
      </div>

      {/* Delete Button */}
      <div className="delete-button-container">
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default WardenRoleCard;
