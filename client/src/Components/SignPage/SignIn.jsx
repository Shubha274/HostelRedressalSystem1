import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
const SignIn = ({ setRole, setUserId }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    console.log(username, password);
    setIsLoading(true);

    try {
      const response = axios.get(
        "http://localhost:8080/api/login",
        {
          userId: username,
          password,
        },
        { withCredentials: true }
      );

      const { token, role } = response.data;

      localStorage.setItem("jwtToken", token);

      // Decode token to get userId and role
      const decoded = jwt_decode(token);
      setUserId(decoded.id);
      setRole(role);

      if (role === "student") {
        navigate("/student-dashboard");
      } else if (role === "warden") {
        navigate("/warden-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        setError("Unknown role.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError("Invalid userId or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Left Side - Logo and Label */}
      <div className="logo-section">
        <FontAwesomeIcon className="logo-size" icon={faHome} color="white" />
        <h1>BV</h1>
        <h2>Redressal Portal</h2>
      </div>

      {/* Right Side - Login Form */}
      <div className="form-section">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
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
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
          <button type="submit" disabled={isLoading} className="login-btn">
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
