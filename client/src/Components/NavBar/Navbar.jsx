import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHotel,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

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
    <div
      className="navbar"
      style={{
        backgroundColor: "#071740",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <div className="navbar-left">
        <span className="logo-text">
          <FontAwesomeIcon icon={faHotel} style={{ marginRight: "10px" }} /> BV
          Hostel Portal
        </span>
      </div>
      <div className="navbar-right">
        <button className="logout-button" onClick={handleLogout}>
          Logout <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
        <span className="navbar-toggle" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
