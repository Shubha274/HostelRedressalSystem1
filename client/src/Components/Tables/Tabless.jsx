import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Ensure this is imported

import axios from "axios";
import "./TableStyles.css";

const Tabless = () => {
  const [data, setData] = useState([]);
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const storedRole = localStorage.getItem("role");
        const storedUserId = localStorage.getItem("userId");

        setRole(storedRole);
        setUserId(storedUserId);

        if (storedRole && storedUserId) {
          axios
            .get(
              `http://localhost:8080/api/issues/fetch/${storedRole}/${storedUserId}`
            )
            .then((response) => {
              setData(response.data);
              setLoading(false);
            })
            .catch((err) => {
              console.error("Error fetching issues:", err);
              setError("Failed to fetch issues.");
              setLoading(false);
            });
        }
      } catch (err) {
        console.error("Invalid token:", err);
        setError("Invalid authentication token.");
        setLoading(false);
      }
    } else {
      setError("No authentication token found.");
      setLoading(false);
    }
  }, []);

  const updateStatus = (id, status) => {
    axios
      .put(`http://localhost:8080/api/issues/update/${id}/${role}/${userId}`, {
        status,
      })
      .then(() => {
        setData((prevData) =>
          prevData.map((item) => (item.id === id ? { ...item, status } : item))
        );
      })
      .catch((err) => {
        console.error("Error updating status:", err);
        setError("Failed to update status.");
      });
  };

  const renderButtons = (id) => (
    <div className="action-buttons">
      <button className="blue" onClick={() => updateStatus(id, "In Progress")}>
        Progress
      </button>
      <button className="red" onClick={() => updateStatus(id, "Resolved")}>
        Resolved
      </button>
    </div>
  );

  const renderTableHeaders = () => {
    if (role === "student") {
      return (
        <>
          <th>Issue Name</th>
          <th>Description</th>
          <th>Generate Date</th>
          <th>Resolved Date</th>
          <th>Status</th>
        </>
      );
    }
    if (role === "warden") {
      return (
        <>
          <th>Student Name</th>
          <th>Course</th>
          <th>Room Number</th>
          <th>Issue Name</th>
          <th>Description</th>
          <th>Generate Date</th>
          <th>Resolved Date</th>
          <th>Status</th>
          <th>Actions</th>
        </>
      );
    }
    if (role === "admin") {
      return (
        <>
          <th>Warden Name</th>
          <th>Hostel Name</th>
          <th>Issue Name</th>
          <th>Description</th>
          <th>Generate Date</th>
          <th>Resolved Date</th>
          <th>Status</th>
        </>
      );
    }
    return null;
  };

  const renderTableRows = () =>
    data.map((item) => (
      <tr key={item.id}>
        {role === "student" && (
          <>
            <td>{item.issueName}</td>
            <td>{item.description}</td>
            <td>{item.generateDate}</td>
            <td>{item.resolvedDate || "N/A"}</td>
            <td>{item.status}</td>
          </>
        )}
        {role === "warden" && (
          <>
            <td>{item.studentName}</td>
            <td>{item.course}</td>
            <td>{item.roomNumber}</td>
            <td>{item.issueName}</td>
            <td>{item.description}</td>
            <td>{item.generateDate}</td>
            <td>{item.resolvedDate || "N/A"}</td>
            <td>{item.status}</td>
            <td>{renderButtons(item.id)}</td>
          </>
        )}
        {role === "admin" && (
          <>
            <td>{item.wardenName}</td>
            <td>{item.hostelName}</td>
            <td>{item.issueName}</td>
            <td>{item.description}</td>
            <td>{item.generateDate}</td>
            <td>{item.resolvedDate || "N/A"}</td>
            <td>{item.status}</td>
          </>
        )}
      </tr>
    ));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>{renderTableHeaders()}</tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
};

export default Tabless;
