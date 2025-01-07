import { useState } from "react";
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

  // Logout function
  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole(null);
  };

  // Private Route to protect pages
  const PrivateRoute = ({ children, allowedRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={`/${role}-dashboard`} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Public Route */}
        <Route
          path="/login"
          element={
            <SignIn setIsAuthenticated={setIsAuthenticated} setRole={setRole} />
          }
        />

        {/* Private Routes */}
        <Route
          path="/student-dashboard"
          element={
            <PrivateRoute allowedRoles={["student"]}>
              <StudentDboard onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/warden-dashboard"
          element={
            <PrivateRoute allowedRoles={["warden"]}>
              <WardenDboard onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDboard onLogout={handleLogout} />
            </PrivateRoute>
          }
        />

        {/* Issue Form for Both Students and Wardens */}
        <Route
          path="/issue-form"
          element={
            <PrivateRoute allowedRoles={["student", "warden"]}>
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
