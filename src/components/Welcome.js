import React from "react";
import Header from "./Header";
import "../style/Welcome.css";

function Welcome({ onLogout }) {
  return (
    <div>
      <Header onLogout={onLogout} />
      <div className="welcome-page-container">
        <h1 className="welcome-page-title">
          Welcome to the Official Vehicle Management System of North Macedonia
        </h1>
        <p className="welcome-page-paragraph">
          This system is the official platform for vehicle registrations in
          North Macedonia. Our goal is to provide a seamless and efficient way
          to manage all vehicle-related data. Whether you are a vehicle owner, a
          dealership, or a government official, our system offers the tools you
          need to manage vehicle information effectively.
        </p>
        <p className="welcome-page-paragraph">With our system, you can:</p>
        <ul className="welcome-page-list">
          <li>Register new vehicles quickly and easily</li>
          <li>Update existing vehicle information with the latest details</li>
          <li>
            Manage owner details, ensuring all records are accurate and
            up-to-date
          </li>
          <li>
            Access detailed statistics and reports for better decision-making
          </li>
        </ul>
        <p className="welcome-page-paragraph">
          Our commitment is to ensure that vehicle registration and management
          processes are streamlined and user-friendly. We utilize the latest
          technology to provide a secure and reliable platform that you can
          trust. Your data is protected with industry-standard security
          measures, ensuring that all information remains confidential and
          secure.
        </p>
        <p className="welcome-page-paragraph">
          Thank you for using the Vehicle Management System. Together, we are
          working towards a better and more organized future for vehicle
          management in North Macedonia. We appreciate your cooperation and look
          forward to serving you better.
        </p>
        <p className="welcome-page-paragraph">
          Sincerely,
          <br />
          The Vehicle Management System Team
          <br />
          Ministry of Transport and Communications, North Macedonia
        </p>
      </div>
    </div>
  );
}

export default Welcome;
