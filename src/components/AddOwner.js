import React, { useState } from "react";
import { fetchWithAuth } from "./fetchWithAuth";
import Header from "./Header";
import "../style/FormStyles.css";

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
    console.log("Sending owner data:", ownerData);

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
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setError(errorData.message || "Failed to add owner");
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Header onLogout={() => console.log("Logged out")} />
      <div className="add-container">
        <h1 className="add-title">Add Owner</h1>
        <form onSubmit={handleSubmit} className="add-form">
          <div className="add-form-group">
            <label className="add-label">First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="add-input"
            />
          </div>
          <div className="add-form-group">
            <label className="add-label">Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="add-input"
            />
          </div>
          <div className="add-form-group">
            <label className="add-label">Date of Birth:</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="add-input"
            />
          </div>
          <div className="add-form-group">
            <label className="add-label">Place of Birth:</label>
            <input
              type="text"
              value={placeOfBirth}
              onChange={(e) => setPlaceOfBirth(e.target.value)}
              className="add-input"
            />
          </div>
          <div className="add-form-group">
            <label className="add-label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="add-input"
            />
          </div>
          <div className="add-form-group">
            <label className="add-label">Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="add-input"
            />
          </div>
          <div className="add-form-group">
            <label className="add-label">Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="add-input"
            >
              <option value="">Select Gender</option>
              <option value="0">Male</option>
              <option value="1">Female</option>
            </select>
          </div>
          <div className="add-form-group">
            <label className="add-label">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="add-input"
            />
          </div>
          <div className="add-form-group">
            <label className="add-label">License Issue Date:</label>
            <input
              type="date"
              value={licenseIssueDate}
              onChange={(e) => setLicenseIssueDate(e.target.value)}
              className="add-input"
            />
          </div>
          <button type="submit" className="add-button">
            Add Owner
          </button>
        </form>
        {error && <p className="add-error">{error}</p>}
      </div>
    </div>
  );
}

export default AddOwner;
