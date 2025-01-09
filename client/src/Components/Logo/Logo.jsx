import React from "react";
import { FaHome } from "react-icons/fa";
import "./logo.css";

const Logo = () => {
  return (
    <div className="fa-home-container">
      <div className="icon-container">
        <FaHome size={50} color="#007bff" />
      </div>
      <div className="label-container">
        <h1>BV</h1>
        <h2>Redressal Portal</h2>
      </div>
    </div>
  );
};

export default Logo;
