import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHotel,
  faSignOutAlt,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token and other user data from localStorage
    localStorage.removeItem("token");
    localStorage.clear(); // Clear all localStorage items if necessary

    // Redirect to the login page
    navigate("/login");
  };

  const handleGoBack = () => {
    // This will take the user to the previous page in history
    navigate(-1);
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
        <button className="back-button" onClick={handleGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
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
