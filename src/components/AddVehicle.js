import React, { useState } from "react";
import { fetchWithAuth } from "./fetchWithAuth";
import Header from "./Header";
import "../style/FormStyles.css";

function AddVehicle({ onLogout }) {
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
    console.log("Sending vehicle data:", vehicleData);

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
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setError(errorData.message || "Failed to add vehicle");
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Header onLogout={onLogout} />
      <div className="add-container">
        <h1 className="add-title">Add Vehicle</h1>
        <form onSubmit={handleSubmit} className="add-form">
          <div className="add-form-group">
            <label className="add-label">Owner ID:</label>
            <input
              type="number"
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              className="add-input"
            />
          </div>
          <div className="add-form-group">
            <label className="add-label">Manufacturer:</label>
            <input
              type="text"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              className="add-input"
            />
          </div>
          <div className="add-form-group">
            <label className="add-label">Model:</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="add-input"
            />
          </div>
          <div className="add-form-group">
            <label className="add-label">Year:</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="add-input"
            />
          </div>
          <div className="add-form-group">
            <label className="add-label">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="add-input"
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
          <div className="add-form-group">
            <label className="add-label">Transmission:</label>
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              className="add-input"
            >
              <option value="">Select Transmission</option>
              <option value="0">Manual</option>
              <option value="1">Automatic</option>
              <option value="2">Semiautomatic</option>
              <option value="3">CVT</option>
            </select>
          </div>
          <div className="add-form-group">
            <label className="add-label">Fuel:</label>
            <select
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              className="add-input"
            >
              <option value="">Select Fuel</option>
              <option value="0">Petrol</option>
              <option value="1">Diesel</option>
              <option value="2">BioDiesel</option>
              <option value="3">Ethanol</option>
            </select>
          </div>
          <div className="add-form-group">
            <label className="add-label">License Plate:</label>
            <input
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              className="add-input"
            />
          </div>
          <div className="add-form-group">
            <label className="add-label">Power:</label>
            <input
              type="number"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              className="add-input"
            />
          </div>
          <button type="submit" className="add-button">
            Add Vehicle
          </button>
        </form>
        {error && <p className="add-error">{error}</p>}
      </div>
    </div>
  );
}

export default AddVehicle;
