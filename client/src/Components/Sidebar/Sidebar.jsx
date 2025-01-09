import React from "react";
import "./Sidebar.css";

const Sidebar = ({ role }) => {
  return (
    <div id="sidebar" className="sidebar">
      <ul>
        <li>
          <a href={`/${role}-dashboard`}>Dashboard</a>
        </li>
        {role === "student" || role === "warden" ? (
          <li>
            <a href="/issue-form">Issue Form</a>
          </li>
        ) : null}
        {role === "warden" || role === "admin" ? (
          <li>
            <a href="/manage-issues">Manage Issues</a>
          </li>
        ) : null}
        <li>
          <a href="/chat-app">Chat App</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
