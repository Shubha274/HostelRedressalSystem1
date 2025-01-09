import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHotel,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
  };

  const handleLogout = () => {
    // Clear the token and other user data from localStorage
    localStorage.removeItem("token");
    localStorage.clear(); // Clear all localStorage items if necessary

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo-text">
          <FontAwesomeIcon icon={faHotel} className="logo-icon" /> BV Hostel
          Portal
        </span>
      </div>
      <div className="navbar-right">
        <button className="logout-button" onClick={handleLogout}>
          Logout <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
        <button className="navbar-toggle" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
