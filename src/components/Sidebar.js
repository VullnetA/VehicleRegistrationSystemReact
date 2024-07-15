import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={sidebarStyle}>
      <ul style={listStyle}>
        <li style={listItemStyle}>
          <Link to="/welcome" style={linkStyle}>
            Welcome
          </Link>
        </li>
        <li style={listItemStyle}>
          <Link to="/vehicles" style={linkStyle}>
            Vehicles
          </Link>
        </li>
        <li style={listItemStyle}>
          <Link to="/add-vehicle" style={linkStyle}>
            Add Vehicle
          </Link>
        </li>
        <li style={listItemStyle}>
          <Link to="/owners" style={linkStyle}>
            Owners
          </Link>
        </li>
        <li style={listItemStyle}>
          <Link to="/add-owner" style={linkStyle}>
            Add Owner
          </Link>
        </li>
        <li style={listItemStyle}>
          <Link to="/statistics" style={linkStyle}>
            Statistics
          </Link>
        </li>
      </ul>
    </div>
  );
}

const sidebarStyle = {
  position: "fixed",
  left: 0,
  top: "60px", // Adjusted to sit below the header
  height: "calc(100% - 60px)", // Adjusted to account for the header height
  width: "200px",
  backgroundColor: "#f8f9fa", // Light grey background
  boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  padding: "20px",
  boxSizing: "border-box",
  zIndex: 999, // Ensure the sidebar is behind the header
};

const listStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
};

const listItemStyle = {
  marginBottom: "10px",
  border: "1px solid #ddd", // Border for cell effect
  borderRadius: "4px",
  backgroundColor: "#fff", // Background color for cell
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const linkStyle = {
  textDecoration: "none",
  color: "#007bff", // Blue link color
  fontWeight: "bold",
  display: "block",
  padding: "10px", // Padding inside the cell
};

export default Sidebar;
