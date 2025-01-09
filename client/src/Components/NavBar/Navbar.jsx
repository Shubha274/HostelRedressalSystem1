import React from "react";
import "./Navbar.css";

const Navbar = ({ logout }) => {
  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="hostel-logo.png" alt="Hostel Logo" />
        <span>BV Hostel Portal</span>
      </div>
      <i className="fas fa-bars toggle-btn" onClick={toggleSidebar}></i>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
