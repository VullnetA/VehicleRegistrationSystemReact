import React, { useState } from "react";
import { fetchWithAuth } from "./fetchWithAuth"; // Adjust the import path as necessary

function AddVehicle() {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuel, setFuel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [power, setPower] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vehicleData = {
      manufacturer,
      model,
      year: Number(year),
      category: Number(category),
      transmission: Number(transmission),
      fuel: Number(fuel),
      licensePlate,
      ownerId: Number(ownerId),
      power: Number(power),
    };
    console.log("Sending vehicle data:", vehicleData); // Log the payload

    try {
      const response = await fetchWithAuth(
        "https://localhost:7221/api/Vehicle",
        {
          method: "POST",
          body: JSON.stringify(vehicleData),
        }
      );

      if (response.ok) {
        setManufacturer("");
        setModel("");
        setYear("");
        setCategory("");
        setTransmission("");
        setFuel("");
        setLicensePlate("");
        setOwnerId("");
        setPower("");
        setError(null);
      } else {
        const errorData = await response.json(); // Capture error response
        console.error("Error response:", errorData); // Log error response
        setError(errorData.message || "Failed to add vehicle");
      }
    } catch (error) {
      console.error("Network error:", error); // Log network error
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Add Vehicle</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Owner ID:</label>
          <input
            type="number"
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Manufacturer:</label>
          <input
            type="text"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Model:</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Category</option>
            <option value="0">Motorcycle</option>
            <option value="1">Hatchback</option>
            <option value="2">Coupe</option>
            <option value="3">Sedan</option>
            <option value="4">Van</option>
            <option value="5">SUV</option>
            <option value="6">Truck</option>
            <option value="7">Bus</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Transmission:</label>
          <select
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Transmission</option>
            <option value="0">Manual</option>
            <option value="1">Automatic</option>
            <option value="2">Semiautomatic</option>
            <option value="3">CVT</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Fuel:</label>
          <select
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Fuel</option>
            <option value="0">Petrol</option>
            <option value="1">Diesel</option>
            <option value="2">BioDiesel</option>
            <option value="3">Ethanol</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>License Plate:</label>
          <input
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Power:</label>
          <input
            type="number"
            value={power}
            onChange={(e) => setPower(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Add Vehicle
        </button>
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

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  marginTop: "20px",
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

export default AddVehicle;
