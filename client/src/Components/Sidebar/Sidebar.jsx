import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Navbar/Navbar.css";
import {
  faTachometerAlt,
  faEdit,
  faComments,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(true);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
>>>>>>> roles
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

<<<<<<< HEAD
  const handleNavigation = (path) => {
    navigate(path);
=======
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsDropdownOpen(false); // Close dropdown after navigation
>>>>>>> roles
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

      {/* Navbar for Small Screens */}
      <div className="navbar">
        <button className="navbar-toggle" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={isDropdownOpen ? faTimes : faBars} />
        </button>
        {isDropdownOpen && (
          <ul className="dropdown-menu">
            <li onClick={() => handleNavigation(`/${role}-dashboard`)}>
              Dashboard
            </li>
            {(role === "student" || role === "warden") && (
              <li onClick={() => handleNavigation("/issue-form")}>
                Issue Form
              </li>
            )}
            <li onClick={() => handleNavigation("/chat-app")}>Chat App</li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Sidebar;
