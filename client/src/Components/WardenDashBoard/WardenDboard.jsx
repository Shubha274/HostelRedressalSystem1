import React from "react";
import "./WardenDboard.css";

import ChatbotWar from "../ChatbotWar/ChatbotWar";

import Navbar from "../NavBar/Navbar";
import Table from "../Tables/Table";
import Sidebar from "../Sidebar/Sidebar";
import { jwtDecode } from "jwt-decode";
import RoleBasedTable from "../Tables/RoleBasedTable";
const token = localStorage.getItem("token");
let role = null;

// Decode the token to get the role if the token exists
if (token) {
  try {
    const decodedToken = jwtDecode(token);
    role = decodedToken.role; // Extract the role from the decoded token
  } catch (error) {
    console.error("Invalid token", error);
  }
}

const WardenDboard = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <ChatbotWar />
      <Table />
      <pre>hello i am the warden of hostel sangam</pre>
      {/* {token && <Sidebar role={role} />} */}
    </div>
  );
};

export default WardenDboard;
