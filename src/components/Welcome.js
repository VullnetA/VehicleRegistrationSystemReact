import React from "react";

function Welcome() {
  return (
    <div style={welcomeContainerStyle}>
      <h1 style={titleStyle}>
        Welcome to the Official Vehicle Management System of North Macedonia
      </h1>
      <p style={paragraphStyle}>
        This system is the official platform for vehicle registrations in North
        Macedonia. Our goal is to provide a seamless and efficient way to manage
        all vehicle-related data. Whether you are a vehicle owner, a dealership,
        or a government official, our system offers the tools you need to manage
        vehicle information effectively.
      </p>
      <p style={paragraphStyle}>With our system, you can:</p>
      <ul style={listStyle}>
        <li>Register new vehicles quickly and easily</li>
        <li>Update existing vehicle information with the latest details</li>
        <li>
          Manage owner details, ensuring all records are accurate and up-to-date
        </li>
        <li>
          Access detailed statistics and reports for better decision-making
        </li>
      </ul>
      <p style={paragraphStyle}>
        Our commitment is to ensure that vehicle registration and management
        processes are streamlined and user-friendly. We utilize the latest
        technology to provide a secure and reliable platform that you can trust.
        Your data is protected with industry-standard security measures,
        ensuring that all information remains confidential and secure.
      </p>
      <p style={paragraphStyle}>
        As part of our continuous improvement efforts, we welcome your feedback
        and suggestions. If you have any questions or need assistance, our
        dedicated support team is here to help. You can reach out to us through
        the contact information provided in the system.
      </p>
      <p style={paragraphStyle}>
        Thank you for using the Vehicle Management System. Together, we are
        working towards a better and more organized future for vehicle
        management in North Macedonia. We appreciate your cooperation and look
        forward to serving you better.
      </p>
      <p style={paragraphStyle}>
        Sincerely,
        <br />
        The Vehicle Management System Team
        <br />
        Ministry of Transport and Communications, North Macedonia
      </p>
    </div>
  );
}

const welcomeContainerStyle = {
  marginLeft: "220px", // Adjusted to start after the sidebar
  marginTop: "80px", // Adjusted to start after the header
  padding: "40px 300px 80px 80px", // Increased left and right padding
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  borderRadius: "8px",
};

const titleStyle = {
  color: "#333",
  textAlign: "left", // Left-aligned title
  marginBottom: "20px",
};

const paragraphStyle = {
  color: "#555",
  fontSize: "16px",
  lineHeight: "1.5",
  marginBottom: "20px",
  textAlign: "left", // Left-aligned text
};

const listStyle = {
  color: "#555",
  fontSize: "16px",
  lineHeight: "1.5",
  marginBottom: "20px",
  paddingLeft: "20px",
  textAlign: "left", // Left-aligned text
};

export default Welcome;
