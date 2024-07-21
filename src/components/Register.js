import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/AuthForm.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const queryParams = new URLSearchParams({
      Email: email,
      Password: password,
    }).toString();

    try {
      const response = await fetch(
        `https://localhost:7221/register?${queryParams}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        navigate("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to register");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-outer-container">
      <div className="auth-container">
        <h1 className="auth-title">Register</h1>
        <form onSubmit={handleSubmit} className="auth-form">
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
          <div className="auth-form-group">
            <label className="auth-label">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="auth-input"
            />
          </div>
          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
        {error && <p className="auth-error">{error}</p>}
      </div>
    </div>
  );
}

export default Register;
