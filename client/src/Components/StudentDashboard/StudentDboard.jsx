import { useState } from "react";
import axios from "axios";
import "./StudentDboard.css";
import "../IssueForm/Forms";
import ChatbotAdm from "../ChatbotStd/ChatbotAdm";
import Navbar from "../NavBar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { jwtDecode } from "jwt-decode";

const StudentDboard = () => {
  //
  return (
    <>
      <Navbar />
      <h1>our student dashboard page</h1>
      <p>i am shubha</p>

      <Sidebar />

      <ChatbotAdm />
    </>
  );
};
export default StudentDboard;
