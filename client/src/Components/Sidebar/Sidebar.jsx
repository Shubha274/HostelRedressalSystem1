import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faEdit,
  faTasks,
  faComments,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <ul>
          <li onClick={() => handleNavigation(`/${role}-dashboard`)}>
            <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
            <span>Dashboard</span>
          </li>
          {(role === "student" || role === "warden") && (
            <li onClick={() => handleNavigation("/issue-form")}>
              <FontAwesomeIcon icon={faEdit} className="icon" />
              <span>Issue Form</span>
            </li>
          )}
          <li onClick={() => handleNavigation("/chat-app")}>
            <FontAwesomeIcon icon={faComments} className="icon" />
            <span>Chat App</span>
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
