// RoleBasedTable.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./TableStyles.css";

const Tabless = () => {
  const [data, setData] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    // Get the token from localStorage (or cookies)
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        // Decode the token to extract the role
        const decoded = jwt_decode(token);
        setRole(decoded.role); // Assuming the role is stored as 'role' in the token payload
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (role) {
      // Fetch data based on role
      axios
        .get(`http://localhost:8080/api/issues?role=${role}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((response) => setData(response.data))
        .catch((err) => console.error(err));
    }
  }, [role]);

  const updateStatus = (id, status) => {
    axios
      .put(
        `http://localhost:8080/api/issues/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then(() => {
        setData((prevData) =>
          prevData.map((item) => (item.id === id ? { ...item, status } : item))
        );
      })
      .catch((err) => console.error(err));
  };

  const renderButtons = (id) => (
    <>
      <button className="blue" onClick={() => updateStatus(id, "In Progress")}>
        Progress
      </button>
      <button className="red" onClick={() => updateStatus(id, "Resolved")}>
        Resolved
      </button>
    </>
  );

  return (
    <table>
      <thead>
        <tr>
          {role === "student" && (
            <>
              <th>Issue Name</th>
              <th>Generate Date</th>
              <th>Resolved Date</th>
              <th>Status</th>
            </>
          )}
          {role === "warden" && (
            <>
              <th>Student Name</th>
              <th>Course</th>
              <th>Room Number</th>
              <th>Issue Name</th>
              <th>Generate Date</th>
              <th>Resolved Date</th>
              <th>Status</th>
              <th>Actions</th>
            </>
          )}
          {role === "admin" && (
            <>
              <th>Warden</th>
              <th>Hostel Name</th>
              <th>Issue Description</th>
              <th>Generate Date</th>
              <th>Resolved Date</th>
              <th>Status</th>
              <th>Actions</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {role === "student" && (
              <>
                <td>{item.issueName}</td>
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
                <td>{item.issueDescription}</td>
                <td>{item.generateDate}</td>
                <td>{item.resolvedDate || "N/A"}</td>
                <td>{item.status}</td>
                <td>{renderButtons(item.id)}</td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tabless;
