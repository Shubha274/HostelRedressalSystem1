import { useState } from "react";
import axios from "axios";
import "./StudentDboard.css";
import StudentRole from "../StudentCard/StudentRoleCard";
import Table from "../Tables/Table";
import Tabless from "../Tables/Tabless";
import "../IssueForm/Forms";
import ChatbotAdm from "../ChatbotStd/ChatbotAdm";
import Navbar from "../NavBar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import WardenRole from "../WardebCard/WardenRoleCard";
import { jwtDecode } from "jwt-decode";

const StudentDboard = () => {
  //
  return (
    <>
      <Navbar />
      {/* <h1>our student dashboard page</h1>
      <p>i am shubha</p> */}
      <WardenRole />
      <Sidebar />
      {/* <Table /> */} <Tabless />
      <ChatbotAdm />
    </>
  );
};
export default StudentDboard;
