import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import SignIn from "./Components/SignPage/SignIn";
import StudentDboard from "./Components/StudentDashboard/StudentDboard";
import WardenDboard from "./Components/WardenDashboard/WardenDboard";
import AdminDboard from "./Components/AdminDashboard/AdminDboard";
import Dboard from "./Components/Daboard/Dboard";
const App = () => {
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
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Navigate to={`/${role}-dashboard`} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/student-dashboard"
          element={
            role === "student" ? <StudentDboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/warden-dashboard"
          element={
            role === "warden" ? <WardenDboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            role === "admin" ? <AdminDboard /> : <Navigate to="/login" />
          }
        />

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        {/* <Route path="/" element={<Dboard />} />
        <Route path="/admin" element={<AdminDboard />} />
        <Route path="/warden" element={<WardenDboard />} />
        <Route path="/student" element={<StudentDboard />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
