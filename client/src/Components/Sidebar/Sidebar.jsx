import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faEdit,
  faTasks,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
// import "./Sidebar.css";

const Sidebar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <ul>
          <li>
            <a href={`/${role}-dashboard`}>
              <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
              <span>Dashboard</span>
            </a>
          </li>
          {(role === "student" || role === "warden") && (
            <li>
              <a href="/issue-form">
                <FontAwesomeIcon icon={faEdit} className="icon" />
                <span>Issue Form</span>
              </a>
            </li>
          )}
          {(role === "warden" || role === "admin") && (
            <li>
              <a href="/manage-issues">
                <FontAwesomeIcon icon={faTasks} className="icon" />
                <span>Manage Issues</span>
              </a>
            </li>
          )}
          <li>
            <a href="/chat-app">
              <FontAwesomeIcon icon={faComments} className="icon" />
              <span>Chat App</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Toggle Button */}
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? "<<" : ">>"}
      </button>
    </>
  );
};

export default Sidebar;
