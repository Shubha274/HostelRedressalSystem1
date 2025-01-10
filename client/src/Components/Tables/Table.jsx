import React, { useState } from "react";
import RoleBasedTable from "./RoleBasedTable";
function Table() {
  const [role, setRole] = useState("student");
  const [status, setStatus] = useState("Pending");

  return (
    <div>
      {/* Conditionally render headers or components based on role */}

      {/* Role and Status Controls */}
      <div className="controls">
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="warden">Warden</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </label>
      </div>

      {/* Role-Based Table */}
      <RoleBasedTable role={role} status={status} />
    </div>
  );
}

export default Table;
