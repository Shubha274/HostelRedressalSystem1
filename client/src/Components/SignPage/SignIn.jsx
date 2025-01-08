import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const SignIn = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // State to manage the role
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    const trimmedUserId = userId.trim();
    const trimmedPassword = password.trim();

    // Check if fields are empty
    if (!trimmedUserId || !trimmedPassword) {
      setError("Please enter both your userId and password.");
      return;
    }

    setIsLoading(true); // Set loading state
    try {
      // Send login request to server
      const response = await axios.post("http://localhost:8080", {
        userId: trimmedUserId,
        password: trimmedPassword,
      });

      const { role } = response.data; // Assuming the server response contains a `role` field
      setRole(role); // Update the role state

      // Navigate based on the role
      switch (role) {
        case "student":
          navigate("/student");
          break;
        case "warden":
          navigate("/warden");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          setError("Unknown role.");
          break;
      }
    } catch (error) {
      // Handle error from server response
      if (error.response) {
        setError(error.response.data?.message || "Login failed.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="login-page">
      <header className="logo-section">
        <h1>Login Portal</h1>
      </header>

      <main className="form-section">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          {error && (
            <p className="error-message" aria-live="polite">
              {error}
            </p>
          )}

          <fieldset>
            <legend>Enter your credentials</legend>
            <label htmlFor="userId">User ID</label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your user ID"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                showPassword ? "Your password (visible)" : "Enter your password"
              }
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password-btn"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </fieldset>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Display role for debugging */}
        {role && <p>Current Role: {role}</p>}
      </main>
    </div>
  );
};

export default SignIn;
