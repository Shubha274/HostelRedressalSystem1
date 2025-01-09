import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ setToken }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Clear the token from state (passed via props)
    setToken(null);

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <FontAwesomeIcon icon={faHotel} className="navbar-icon" />
        <span className="navbar-title">BV Hostel Portal</span>
      </div>
      <button className="navbar-menu" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
      <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/issue-form">Issue Form</Link>
        </li>
        <li>
          <Link to="/chat-messenger">Chat Messenger</Link>
        </li>
        <li>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
