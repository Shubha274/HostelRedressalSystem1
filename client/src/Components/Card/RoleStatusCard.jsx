import React, { useState, useEffect } from 'react';
import './RoleStatusCard.css'; // Import the CSS file

// Simulating fetching data from the database
const fetchDataFromDatabase = () => {
  return {
    role: "Warden", // Role can be "Student" or "Warden"
    issue: "Switch is not working", // Example data
    issueCreatedTime: "Jan 10, 2025", // Example data
    description: "This issue is not solved by us.", // Default description for warden
    hostelName: "Sangam", // Example data for warden's view
    status: "Pending", // Can be either "Pending" or "Resolved"
  };
};

const RoleStatusCard = () => {
  const [data, setData] = useState({});
  const [isVisible, setIsVisible] = useState(true); // State to toggle visibility of the card

  // Fetch data from the "database" on component mount
  useEffect(() => {
    const fetchedData = fetchDataFromDatabase();
    setData(fetchedData);
  }, []);

  const { role, issue, issueCreatedTime, description, hostelName, status } = data;

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

      {/* Conditional rendering based on role */}
      {role === "Warden" && (
        <>
          {/* Hostel Name (2nd line for Warden) - Highlighted */}
          <p className="highlighted-hostel">{hostelName}</p>
          {/* Issue Created Time (3rd line for Warden) */}
          <p className="highlighted-date">{issueCreatedTime}</p>
          {/* Default description for Warden */}
          <p className="text-style">{description}</p>
        </>
      )}

      {role === "Student" && (
        <>
          {/* Issue Created Time (2nd line for Student) */}
          <p className="highlighted-date">{issueCreatedTime}</p>
          {/* Issue Description (3rd line for Student) */}
          <p className="text-style">{description}</p>
        </>
      )}

      {/* Status Box below the content */}
      <div className={`status-box ${status === 'Resolved' ? 'resolved' : 'pending'}`}>
        {status} {/* Displaying "Pending" or "Resolved" */}
      </div>

      {/* Delete Button */}
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default RoleStatusCard;
