import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    userId: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // const trimmedUserId = inputs.userId.trim();
    // const trimmedPassword = inputs.password.trim();

    if (!inputs.userId || !inputs.password) {
      setError("Please enter both your userId and password.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        inputs
      );
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Decode the token to get the user role
      // const decodedToken = jwtDecode(token);
      // const { role } = decodedToken;
      navigate("/student-dashboard");
    } catch (error) {
      if (error.response) {
        setError(error.response.data?.message || "Login failed.");
      } else {
        setError("An unexpected error occurred.");
      }
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
              name="userId"
              onChange={handleChange}
              placeholder="Enter your university ID"
              required
              autoComplete="username"
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
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

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default SignIn;
