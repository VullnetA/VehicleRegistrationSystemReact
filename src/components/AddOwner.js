import React, { useState } from "react";

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
      const response = await fetch("https://localhost:7221/api/Owner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    <div>
      <h1>Add Owner</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div>
          <label>Place of Birth:</label>
          <input
            type="text"
            value={placeOfBirth}
            onChange={(e) => setPlaceOfBirth(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label>License Issue Date:</label>
          <input
            type="date"
            value={licenseIssueDate}
            onChange={(e) => setLicenseIssueDate(e.target.value)}
          />
        </div>
        <button type="submit">Add Owner</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default AddOwner;
