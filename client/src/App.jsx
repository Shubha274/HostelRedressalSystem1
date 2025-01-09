import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Components/SignPage/SignIn";
import Navbar from "./Components/NavBar/Navbar";
import Dashboards from "./Components/Dasboard/Dashboards";
import StudentDboard from "./Components/StudentDashboard/StudentDboard";
import WardenDboard from "./Components/WardenDashBoard/WardenDboard";
import AdminDboard from "./Components/AdminDashboard/AdminDboard";
import Forms from "./Components/IssueForm/Forms";
import ChatMessenger from "./Components/ChatApp/ChatMessenger";
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState("");

  // Decode token and set role
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role); // Assuming the role is in the token payload
    }
  }, [token]);

  const saveToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  return (
    <Router>
      {token ? (
        <div className="app">
          <Sidebar role={role} />
          <div className="content">
            <Routes>
              <Route
                path="/dashboard"
                element={
                  role === "student" ? (
                    <StudentDboard />
                  ) : role === "warden" ? (
                    <WardenDboard />
                  ) : role === "admin" ? (
                    <AdminDboard />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<SignIn setToken={saveToken} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
