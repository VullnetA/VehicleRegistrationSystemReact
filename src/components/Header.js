import React from "react";
import { useNavigate } from "react-router-dom";
import flagImage from "../style/flag.png";
import "../style/Header.css";

function Header({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <header className="header-container">
      <div className="header-title-container">
        <h1 className="header-title">Vehicle Registration System</h1>
        <img src={flagImage} alt="Flag" className="header-flag" />
      </div>
      <button onClick={handleLogout} className="header-logout-button">
        Logout
      </button>
    </header>
  );
}

export default Header;
