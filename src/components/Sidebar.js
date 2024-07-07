import React from "react";
import { Link } from "react-router-dom";
import "../style/Sidebar.css"; // Import the CSS file

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/welcome">Welcome</Link>
        </li>
        <li>
          <Link to="/vehicles">Vehicles</Link>
        </li>
        <li>
          <Link to="/owners">Owners</Link>
        </li>
        <li>
          <Link to="/add-vehicle">Add Vehicle</Link>
        </li>
        <li>
          <Link to="/add-owner">Add Owner</Link>
        </li>
        <li>
          <Link to="/statistics">Statistics</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
