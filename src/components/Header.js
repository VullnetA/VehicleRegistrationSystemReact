import React from "react";
import { useNavigate } from "react-router-dom";
import flagImage from "../style/flag.png"; // Replace with the correct path to your flag image

function Header({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <header style={headerStyle}>
      <div style={titleContainerStyle}>
        <h1 style={titleStyle}>Vehicle Registration System</h1>
        <img src={flagImage} alt="Flag" style={flagStyle} />
      </div>
      <button onClick={handleLogout} style={buttonStyle}>
        Logout
      </button>
    </header>
  );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#f8f9fa", // Light grey background
  color: "#333", // Dark text color
  padding: "10px 20px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  width: "100%",
  zIndex: 1000, // Ensure the header is in front of the sidebar
  boxSizing: "border-box",
};

const titleContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
};

const titleStyle = {
  margin: 0,
  marginRight: "10px",
};

const flagStyle = {
  width: "60px", // Increased width
  height: "auto",
};

const buttonStyle = {
  backgroundColor: "#007bff", // Blue button
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  cursor: "pointer",
  borderRadius: "5px",
};

export default Header;
