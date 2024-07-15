import React, { useState } from "react";
import { fetchWithAuth } from "./fetchWithAuth"; // Adjust the import path as necessary

function AddOwner() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [licenseIssueDate, setLicenseIssueDate] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Append time component to date fields
    const dateOfBirthWithTime = `${dateOfBirth}T00:00:00.000Z`;
    const licenseIssueDateWithTime = `${licenseIssueDate}T00:00:00.000Z`;

    const ownerData = {
      firstName,
      lastName,
      dateOfBirth: dateOfBirthWithTime,
      placeOfBirth,
      email,
      phone,
      gender: Number(gender),
      address,
      licenseIssueDate: licenseIssueDateWithTime,
    };
    console.log("Sending owner data:", ownerData); // Log the payload

    try {
      const response = await fetchWithAuth("https://localhost:7221/api/Owner", {
        method: "POST",
        body: JSON.stringify(ownerData),
      });

      if (response.ok) {
        setFirstName("");
        setLastName("");
        setDateOfBirth("");
        setPlaceOfBirth("");
        setEmail("");
        setPhone("");
        setGender("");
        setAddress("");
        setLicenseIssueDate("");
        setError(null);
      } else {
        const errorData = await response.json(); // Capture error response
        console.error("Error response:", errorData); // Log error response
        setError(errorData.message || "Failed to add owner");
      }
    } catch (error) {
      console.error("Network error:", error); // Log network error
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Add Owner</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Place of Birth:</label>
          <input
            type="text"
            value={placeOfBirth}
            onChange={(e) => setPlaceOfBirth(e.target.value)}
            style={inputStyle}
          />
        </div>
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
          <label style={labelStyle}>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Gender</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>License Issue Date:</label>
          <input
            type="date"
            value={licenseIssueDate}
            onChange={(e) => setLicenseIssueDate(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={buttonContainerStyle}>
          <button type="submit" style={buttonStyle}>
            Add Owner
          </button>
        </div>
      </form>
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
}

const containerStyle = {
  marginLeft: "220px", // Adjusted to start after the sidebar
  marginTop: "80px", // Adjusted to start after the header
  padding: "20px 40px",
  backgroundColor: "#f4f4f9",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const titleStyle = {
  color: "#333",
  marginBottom: "20px",
  textAlign: "center", // Center the title
  fontSize: "2em",
  fontWeight: "bold",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const formGroupStyle = {
  marginBottom: "20px",
  width: "100%",
  maxWidth: "500px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  color: "#333",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center", // Center the button
  width: "100%",
  marginTop: "20px",
};

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const errorStyle = {
  color: "red",
  textAlign: "center",
  marginTop: "20px",
};

// Adding hover effect for buttons
const buttonHoverStyle = (buttonStyle) => ({
  ...buttonStyle,
  ":hover": {
    backgroundColor:
      buttonStyle.backgroundColor === "#007bff"
        ? "#0056b3"
        : buttonStyle.backgroundColor,
  },
});

// Applying hover effect to buttons
const addButtonHoverStyle = buttonHoverStyle(buttonStyle);

export default AddOwner;
