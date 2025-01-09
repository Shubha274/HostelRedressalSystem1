import { useEffect } from "react";
import axios from "axios";
import "./StudentDboard.css";
import "../IssueForm/Forms";
import Navbar from "../NavBar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
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

const StudentDboard = () => {
  //
  return (
    <>
      <Navbar />
      <h1>our student dashboard page</h1>
      <p>i am shubha</p>

      {token && <Sidebar role={role} />}
      {/* <Sidebar />
      <Navbar /> */}
      {/* <Forms /> */}
    </>
  );
};
export default StudentDboard;
