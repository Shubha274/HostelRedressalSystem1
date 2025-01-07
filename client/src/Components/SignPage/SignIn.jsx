import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedUserId = userId.trim();
    const trimmedPassword = password.trim();
    console.log(trimmedUserId);
    console.log(trimmedPassword);
    if (!trimmedUserId || !trimmedPassword) {
      setError("Please enter both your userId and password.");
      return;
    }

    if (trimmedUserId !== trimmedPassword) {
      setError("UserId and password must be the same.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        { userId: trimmedUserId, password: trimmedPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      const { role, userData } = response.data;
      console.log(role);
      localStorage.setItem("user", JSON.stringify(userData));

      if (role === "student") {
        navigate("/student-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "warden") {
        navigate("/warden-dashboard");
      } else {
        setError("Unknown role.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <header className="logo-section">
        <FontAwesomeIcon className="logo-size" icon={faHome} color="white" />
        <h1>BV</h1>
        <h2>Redressal Portal</h2>
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
            <label htmlFor="userId">University ID</label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your university ID"
              required
              autoComplete="username"
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
              autoComplete="current-password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password-btn"
              aria-label="Toggle password visibility"
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </fieldset>

          <button type="submit" disabled={isLoading} className="login-btn">
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default SignIn;
