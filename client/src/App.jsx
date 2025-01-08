// const [token, setToken] = useState(localStorage.getItem("token"));
// const [role, setRole] = useState(null);

// useEffect(() => {
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);

//       // Check token expiration
//       if (decodedToken.exp * 1000 < Date.now()) {
//         localStorage.removeItem("token");
//         setToken(null);
//         setRole(null);
//       } else {
//         setRole(decodedToken.role); // Set the role from the decoded token
//       }
//     } catch (error) {
//       console.error("Invalid token:", error);
//       localStorage.removeItem("token");
//       setToken(null);
//       setRole(null);
//     }
//   } else {
//     setRole(null);
//   }
// }, [token]);

// // Function to handle token updates after login
// const handleTokenUpdate = (newToken) => {
//   localStorage.setItem("token", newToken);
//   setToken(newToken);
// };

// // Helper function to determine the dashboard path
// const getDashboardPath = () => {
//   switch (role) {
//     case "student":
//       return "/student-dashboard";
//     case "warden":
//       return "/warden-dashboard";
//     case "admin":
//       return "/admin-dashboard";
//     default:
//       return "/login";
//   }
// };

import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/SignPage/Login";
import StudentDboard from "./Components/StudentDashboard/StudentDboard";
import WardenDboard from "./Components/WardenDashboard/WardenDboard";
import AdminDboard from "./Components/AdminDashboard/AdminDboard";
import Forms from "./Components/IssueForm/Forms";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student-dashboard" element={<StudentDboard />} />
        <Route path="/issue-form" element={<Forms />} />
        <Route path="/warden-dashboard" element={<WardenDboard />} />
        <Route path="/admin-dashboard" element={<AdminDboard />} />
      </Routes>
    </Router>
  );
};

export default App;
