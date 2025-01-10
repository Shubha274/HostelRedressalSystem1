// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./login.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // Loading state
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (!username || !password) {
//       alert("Please enter both username and password.");
//       return;
//     }

//     setIsLoading(true); // Start loading state

//     try {
//       const response = await axios.post("http://localhost:8080/api/login", {
//         username,
//         password,
//       });
//       const { role } = response.data;

//       // Redirect based on role
//       if (role === "student") {
//         navigate("/student-dashboard");
//       } else if (role === "warden") {
//         navigate("/warden-dashboard");
//       } else if (role === "admin") {
//         navigate("/admin-dashboard");
//       } else {
//         alert("Unknown role");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Invalid username or password");

//       // Clear the username and password fields on error
//       setUsername("");
//       setPassword("");
//     } finally {
//       setIsLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="logo-container">
//         {/* Hostel Icon */}
//         <FontAwesomeIcon icon={faHome} size="2x" color="#007bff" />
//         <h2>BV</h2>
//         <h2>Redressal Portal</h2>
//       </div>
//       <h2>Login</h2>
//       <label>Username</label>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Enter your username"
//       />
//       <label>Password</label>
//       <input
//         type={showPassword ? "text" : "password"}
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Enter your password"
//       />
//       <button onClick={() => setShowPassword(!showPassword)}>
//         {showPassword ? "Hide Password" : "Show Password"}
//       </button>
//       <button onClick={handleLogin} disabled={isLoading}>
//         {isLoading ? "Logging in..." : "Login"}
//       </button>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Login = ({ setRole, setUserId }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    // setIsLoading(true);

    try {
      // Send both userId (username) and password to the backend
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          userId: username, // username is used as userId in the DB
          password, // send the password as well
        }
      );

      const { token, role } = response.data;

      // Store token in localStorage
      localStorage.setItem("jwtToken", token);

      // Decode token to get userId and role
      const decoded = jwt_decode(token);
      setUserId(decoded.id);
      setRole(decoded.role);

      // Redirect user based on their role
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
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(onChange = { handleChange })}
            placeholder="Enter your password"
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

export default Login;
