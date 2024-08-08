import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "./fetchWithAuth";
import Header from "./Header";
import "../style/EditForm.css";

function EditVehicle({ onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [licensePlate, setLicensePlate] = useState(""); // Initialize as empty string
  const [ownerId, setOwnerId] = useState(""); // Initialize as empty string
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
          setLicensePlate(data.licensePlate || ""); // Ensure it's a string
          setOwnerId(
            data.owner.id !== undefined ? data.owner.id.toString() : ""
          ); // Ensure it's a string
        } else {
          setError("Failed to fetch vehicle details");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    };
    fetchVehicle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedVehicle = {
      ...vehicle,
      licensePlate,
      ownerId: Number(ownerId), // Convert ownerId to a number
    };

    console.log("Updated Vehicle:", updatedVehicle); // Log the data being sent

    try {
      const response = await fetchWithAuth(
        `https://localhost:7221/vehicle/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedVehicle),
        }
      );

      if (response.ok) {
        navigate(`/vehicle/${id}`);
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData); // Log the error response
        setError(errorData.message || "Failed to update vehicle");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  if (error) {
    return <div className="edit-error">{error}</div>;
  }

  if (!vehicle) {
    return <div className="edit-loading">Loading...</div>;
  }

  return (
    <div>
      <Header onLogout={onLogout} />
      <div className="edit-container">
        <h1 className="edit-title">Edit Vehicle</h1>
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="edit-form-group">
            <label className="edit-label">License Plate:</label>
            <input
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              className="edit-input"
            />
          </div>
          <div className="edit-form-group">
            <label className="edit-label">Owner ID:</label>
            <input
              type="number"
              value={ownerId} // Use ownerId from state
              onChange={(e) => setOwnerId(e.target.value)}
              className="edit-input"
            />
          </div>
          <button type="submit" className="edit-button">
            Update Vehicle
          </button>
        </form>
        {error && <p className="edit-error">{error}</p>}
      </div>
    </div>
  );
}

export default EditVehicle;
