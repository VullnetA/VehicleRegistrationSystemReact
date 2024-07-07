import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "./fetchWithAuth"; // Import the fetchWithAuth function

function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetchWithAuth(
          `https://localhost:7221/vehicle/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setVehicle(data);
          fetchInsurance(data.id);
        } else {
          setError("Failed to fetch vehicle details");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    };

    const fetchInsurance = async (vehicleId) => {
      try {
        const response = await fetchWithAuth(
          `https://localhost:7221/insurance/vehicle/${vehicleId}`
        );
        if (response.ok) {
          const data = await response.json();
          setInsurance(data);
        } else if (response.status !== 404) {
          setError("Failed to fetch insurance details");
        }
      } catch (error) {
        setError(
          "An error occurred while fetching insurance details. Please try again."
        );
      }
    };

    fetchVehicle();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetchWithAuth(
        `https://localhost:7221/vehicle/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        navigate("/vehicles");
      } else {
        setError("Failed to delete vehicle");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Vehicle Details</h1>
      <p>ID: {vehicle.id}</p>
      <p>Manufacturer: {vehicle.manufacturer}</p>
      <p>Model: {vehicle.model}</p>
      <p>Year: {vehicle.year}</p>
      <p>Category: {vehicle.category}</p>
      <p>License Plate: {vehicle.licensePlate}</p>
      <p>
        Date Registered: {new Date(vehicle.dateRegistered).toLocaleDateString()}
      </p>
      <p>
        Expiration Date: {new Date(vehicle.expirationDate).toLocaleDateString()}
      </p>
      <h2>Owner Details</h2>
      <p>ID: {vehicle.owner.id}</p>
      <p>First Name: {vehicle.owner.firstName}</p>
      <p>Last Name: {vehicle.owner.lastName}</p>
      <p>
        Date of Birth:{" "}
        {new Date(vehicle.owner.dateOfBirth).toLocaleDateString()}
      </p>
      <p>Gender: {vehicle.owner.gender}</p>
      <p>Address: {vehicle.owner.address}</p>
      <p>
        License Issue Date:{" "}
        {new Date(vehicle.owner.licenseIssueDate).toLocaleDateString()}
      </p>
      <button onClick={handleDelete}>Delete Vehicle</button>
      <button onClick={() => navigate(`/edit-vehicle/${id}`)}>
        Edit Vehicle
      </button>

      <h2>Insurance Status</h2>
      {insurance ? (
        <div>
          <p>This vehicle has registered insurance.</p>
          <button onClick={() => navigate(`/insurance/${insurance.id}`)}>
            View Insurance Details
          </button>
        </div>
      ) : (
        <div>
          <p>No insurance found for this vehicle.</p>
          <button onClick={() => navigate(`/add-insurance/${vehicle.id}`)}>
            Add Insurance
          </button>
        </div>
      )}
    </div>
  );
}

export default VehicleDetails;
