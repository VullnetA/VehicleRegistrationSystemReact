import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/AuthForm.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7221/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful, received data:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.roles[0]);
        localStorage.setItem("ownerId", data.ownerId);
        console.log("Stored ownerId:", data.ownerId);

        onLogin();
        if (data.roles.includes("Admin")) {
          navigate("/welcome");
        } else if (data.roles.includes("Owner")) {
          navigate("/my-vehicles");
        }
        setEmail("");
        setPassword("");
        setError(null);
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        setError("Login failed: " + errorData.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-outer-container">
      <div className="auth-container">
        <h1 className="auth-title">Login</h1>
        <form onSubmit={handleOnSubmit} className="auth-form">
          <div className="auth-form-group">
            <label className="auth-label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
          </div>
          <div className="auth-form-group">
            <label className="auth-label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        {error && <p className="auth-error">{error}</p>}
        <p className="auth-register-link">
          Don't have an account?{" "}
          <a href="/register" className="auth-link">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
