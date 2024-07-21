import React from "react";
import { Link } from "react-router-dom";
import "../style/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/welcome" className="sidebar-link">
            Welcome
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/vehicles" className="sidebar-link">
            Vehicles
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/add-vehicle" className="sidebar-link">
            Add Vehicle
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/owners" className="sidebar-link">
            Owners
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/add-owner" className="sidebar-link">
            Add Owner
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/statistics" className="sidebar-link">
            Statistics
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
