import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import "../Navbar/Navbar.css";
import {
  faTachometerAlt,
  faEdit,
  faComments,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role; // Extract the role from the decoded token
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      {/* Static Sidebar */}
      <div className="sidebar open">
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
          <li onClick={() => handleNavigation("/about")}>
            <FontAwesomeIcon icon={faInfoCircle} className="icon" />
            <span>About</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
