import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignIn from "./Components/SignPage/SignIn";
import StudentDboard from "./Components/StudentDashboard/StudentDboard";
import WardenDboard from "./Components/WardenDashboard/WardenDboard";
import AdminDboard from "./Components/AdminDashboard/AdminDboard";
import Forms from "./Components/IssueForm/Forms";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  // Check for an existing token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (token && userRole) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
  }, []);

  // Private route wrapper
  const PrivateRoute = ({ children, roleRequired }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
    if (role !== roleRequired) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route
          path="/"
          element={
            <SignIn setIsAuthenticated={setIsAuthenticated} setRole={setRole} />
          }
        />

        {/* Private routes */}
        <Route
          path="/student-dashboard"
          element={
            <PrivateRoute roleRequired="student">
              <StudentDboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/warden-dashboard"
          element={
            <PrivateRoute roleRequired="warden">
              <WardenDboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute roleRequired="admin">
              <AdminDboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/issue-form"
          element={
            <PrivateRoute roleRequired="student">
              <Forms />
            </PrivateRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
