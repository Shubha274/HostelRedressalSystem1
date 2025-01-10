import React from "react";
import Navbar from "../NavBar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import ChatbotHeadWar from "../ChatbotHeadWar/ChatbotHeadWar";
import Chart from "../Chartss/Chart";
import { jwtDecode } from "jwt-decode";
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
const AdminDboard = () => {
  return (
    <div>
      <Navbar />
      <h1>hello i am the admin</h1>
      <ChatbotHeadWar />
      <Chart />
      <Sidebar />
    </div>
  );
};
export default AdminDboard;
