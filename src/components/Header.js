import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <header style={headerStyle}>
      <h1>Vehicle Registration System</h1>
      <button onClick={handleLogout} style={buttonStyle}>
        Logout
      </button>
    </header>
  );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "#333",
  color: "#fff",
  padding: "10px 20px",
};

const buttonStyle = {
  backgroundColor: "#f44336",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  cursor: "pointer",
};

export default Header;
