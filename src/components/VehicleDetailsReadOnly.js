import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchWithAuth } from "./fetchWithAuth";
import Header from "./Header";
import "../style/VehicleDetailsReadOnly.css";

function VehicleDetailsReadOnly({ onLogout }) {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState(null);

  const categoryEnum = [
    "Motorcycle",
    "Hatchback",
    "Coupe",
    "Sedan",
    "Van",
    "SUV",
    "Truck",
    "Bus",
  ];

  const genderEnum = ["Male", "Female"];

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetchWithAuth(
          `https://localhost:7221/vehicle/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setVehicle(data);
        } else {
          setError("Failed to fetch vehicle details");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    };

    fetchVehicle();
  }, [id]);

  if (error) {
    return <div className="vehicle-details-error">{error}</div>;
  }

  if (!vehicle) {
    return <div className="vehicle-details-loading">Loading...</div>;
  }

  return (
    <div>
      <Header onLogout={onLogout} />
      <div className="vehicle-details-container">
        <h1 className="vehicle-details-title">Vehicle Details</h1>
        <div className="vehicle-details-content-container">
          <div className="vehicle-details-column">
            <h2 className="vehicle-details-sub-title">Vehicle Information</h2>
            <p className="vehicle-details-detail">
              <strong>ID:</strong> {vehicle.id}
            </p>
            <p className="vehicle-details-detail">
              <strong>Manufacturer:</strong> {vehicle.manufacturer}
            </p>
            <p className="vehicle-details-detail">
              <strong>Model:</strong> {vehicle.model}
            </p>
            <p className="vehicle-details-detail">
              <strong>Year:</strong> {vehicle.year}
            </p>
            <p className="vehicle-details-detail">
              <strong>Category:</strong> {categoryEnum[vehicle.category]}
            </p>
            <p className="vehicle-details-detail">
              <strong>License Plate:</strong> {vehicle.licensePlate}
            </p>
            <p className="vehicle-details-detail">
              <strong>Date Registered:</strong>{" "}
              {new Date(vehicle.dateRegistered).toLocaleDateString()}
            </p>
            <p className="vehicle-details-detail">
              <strong>Expiration Date:</strong>{" "}
              {new Date(vehicle.expirationDate).toLocaleDateString()}
            </p>
          </div>
          <div className="vehicle-details-column">
            <h2 className="vehicle-details-sub-title">Owner Details</h2>
            <p className="vehicle-details-detail">
              <strong>ID:</strong> {vehicle.owner.id}
            </p>
            <p className="vehicle-details-detail">
              <strong>Name:</strong> {vehicle.owner.firstName}{" "}
              {vehicle.owner.lastName}
            </p>
            <p className="vehicle-details-detail">
              <strong>Date of Birth:</strong>{" "}
              {new Date(vehicle.owner.dateOfBirth).toLocaleDateString()}
            </p>
            <p className="vehicle-details-detail">
              <strong>Email:</strong> {vehicle.owner.email}
            </p>
            <p className="vehicle-details-detail">
              <strong>Phone:</strong> {vehicle.owner.phone}
            </p>
            <p className="vehicle-details-detail">
              <strong>Gender:</strong> {genderEnum[vehicle.owner.gender]}
            </p>
            <p className="vehicle-details-detail">
              <strong>Address:</strong> {vehicle.owner.address}
            </p>
            <p className="vehicle-details-detail">
              <strong>License Issue Date:</strong>{" "}
              {new Date(vehicle.owner.licenseIssueDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetailsReadOnly;
