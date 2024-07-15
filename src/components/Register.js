import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div style={outerContainerStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Register</h1>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </form>
        {error && <p style={errorStyle}>{error}</p>}
      </div>
    </div>
  );
}

const outerContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f4f4f9",
};

const containerStyle = {
  backgroundColor: "#fff",
  padding: "40px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "400px",
  textAlign: "center",
};

const titleStyle = {
  color: "#333",
  fontSize: "2.5em",
  fontWeight: "bold",
  marginBottom: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const formGroupStyle = {
  width: "100%",
  marginBottom: "15px",
  textAlign: "left",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
  fontSize: "1em",
  marginTop: "10px",
};

const errorStyle = {
  color: "red",
  textAlign: "center",
  marginTop: "10px",
};

export default Register;
