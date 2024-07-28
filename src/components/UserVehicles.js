import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "./fetchWithAuth";
import Header from "./Header";
import "../style/UserVehicles.css";

function UserVehicles({ onLogout }) {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserVehicles = async () => {
      try {
        const ownerId = localStorage.getItem("ownerId");
        if (!ownerId) {
          setError("Owner ID not found");
          return;
        }

        const response = await fetchWithAuth(
          `https://localhost:7221/vehiclesbyowner/${ownerId}`
        );
        if (response.ok) {
          const data = await response.json();
          setVehicles(data);
        } else {
          const errorData = await response.json();
          console.error("Failed to fetch vehicles:", errorData);
          setError(errorData.message || "Failed to fetch vehicles");
        }
      } catch (error) {
        console.error("An error occurred while fetching vehicles:", error);
        setError("An error occurred. Please try again.");
      }
    };

    fetchUserVehicles();
  }, []);

  return (
    <div>
      <Header onLogout={onLogout} />
      <div className="user-vehicles-container">
        <h1 className="user-vehicles-title">My Vehicles</h1>
        {error && <p className="user-vehicles-error">{error}</p>}
        <table className="user-vehicles-table">
          <thead>
            <tr>
              <th className="user-vehicles-th">Manufacturer</th>
              <th className="user-vehicles-th">Model</th>
              <th className="user-vehicles-th">Year</th>
              <th className="user-vehicles-th">License Plate</th>
              <th className="user-vehicles-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="user-vehicles-tr">
                <td className="user-vehicles-td">{vehicle.manufacturer}</td>
                <td className="user-vehicles-td">{vehicle.model}</td>
                <td className="user-vehicles-td">{vehicle.year}</td>
                <td className="user-vehicles-td">{vehicle.licensePlate}</td>
                <td className="user-vehicles-td">
                  <button
                    onClick={() => navigate(`/vehicle-readonly/${vehicle.id}`)}
                    className="user-vehicles-button"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="user-vehicles-statistics-button-container">
          <button
            onClick={() => navigate("/statistics")}
            className="user-vehicles-statistics-button"
          >
            View Statistics
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserVehicles;
