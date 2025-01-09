import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ role }) => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        {role === "student" && (
          <li>
            <Link to="/issue-form">Issue Form</Link>
          </li>
        )}
        {(role === "warden" || role === "admin") && (
          <li>
            <Link to="/manage-issues">Manage Issues</Link>
          </li>
        )}
        <li>
          <Link to="/chat-messenger">Chat Messenger</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
