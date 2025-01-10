import React, { useState } from "react";
import "./TableStyles.css";

const RoleBasedTable = ({ role, status }) => {
  const data = {
    student: [
      { name: "Ridhi", hostelName: "Hostel A", issue: "Leaking Pipe", issueDate: "2025-01-01", status: "Pending" },
      { name: "Moni", hostelName: "Hostel B", issue: "Broken Fan", issueDate: "2025-01-02", status: "Resolved" },
    ],
    warden: [
      { name: "Kirti", roomNo: "102", course: "MCA", issue: "Broken Light", issueDate: "2025-01-02", status: "Pending" },
      { name: "Sona", roomNo: "202", course: "B.Tech", issue: "Clogged Sink", issueDate: "2025-01-01", status: "Resolved" },
    ],
  };

  const filteredData = data[role].filter((item) => item.status === status);

  return (
    <div className="table-container">
      <h2 style={{ color: "black" }}>
        {role.charAt(0).toUpperCase() + role.slice(1)} Table - {status}
      </h2>
      <table>
        <thead>
          <tr>
            {role === "student" ? (
              <>
                <th>Name</th>
                <th>Hostel Name</th>
                <th>Issue</th>
                <th>Issue Date</th>
                <th>Status</th>
              </>
            ) : (
              <>
                <th>Name</th>
                <th>Room No</th>
                <th>Course</th>
                <th>Issue</th>
                <th>Issue Date</th>
                <th>Status</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              {role === "student" ? (
                <>
                  <td>{item.hostelName}</td>
                  <td>{item.issue}</td>
                  <td>{item.issueDate}</td>
                  <td>{item.status}</td>
                </>
              ) : (
                <>
                  <td>{item.roomNo}</td>
                  <td>{item.course}</td>
                  <td>{item.issue}</td>
                  <td>{item.issueDate}</td>
                  <td>{item.status}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleBasedTable;
