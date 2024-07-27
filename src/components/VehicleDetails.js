import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "./fetchWithAuth";
import Header from "./Header";
import "../style/VehicleDetails.css";

function VehicleDetails({ onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [error, setError] = useState(null);
  const [insuranceCompany, setInsuranceCompany] = useState("");

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

  const insuranceCompanies = [
    { value: 0, label: "SAVA" },
    { value: 1, label: "UNIQA" },
    { value: 2, label: "TRIGLAV" },
    { value: 3, label: "AKTIVA" },
  ];

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
          if (
            data.id === 0 &&
            data.insuranceCompany === 0 &&
            data.insuranceFee === 0
          ) {
            setInsurance(null);
          } else {
            setInsurance(data);
          }
        } else if (response.status === 404) {
          setInsurance(null);
        } else {
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

  const handleAddInsurance = async () => {
    const insuranceData = {
      insuranceCompany: Number(insuranceCompany),
      vehicleId: id,
    };

    try {
      const response = await fetchWithAuth(
        "https://localhost:7221/api/Insurance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(insuranceData),
        }
      );

      if (response.ok) {
        const fetchNewInsurance = async () => {
          try {
            const newInsuranceResponse = await fetchWithAuth(
              `https://localhost:7221/insurance/vehicle/${id}`
            );
            if (newInsuranceResponse.ok) {
              const newInsuranceData = await newInsuranceResponse.json();
              navigate(`/insurance/${newInsuranceData.id}`);
            } else {
              setError("Failed to fetch new insurance details");
            }
          } catch (error) {
            setError("An error occurred while fetching new insurance details");
          }
        };
        fetchNewInsurance();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add insurance");
      }
    } catch (error) {
      setError("An error occurred while adding insurance. Please try again.");
    }
  };

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
              <strong>License Issue Date:</strong>{" "}
              {new Date(vehicle.owner.licenseIssueDate).toLocaleDateString()}
            </p>
            <h2 className="vehicle-details-sub-title">Insurance Status</h2>
            {insurance ? (
              <div>
                <p className="vehicle-details-detail">
                  This vehicle has registered insurance.
                </p>
                <button
                  onClick={() => navigate(`/insurance/${insurance.id}`)}
                  className="vehicle-details-view-button"
                >
                  View Insurance Details
                </button>
              </div>
            ) : (
              <div>
                <p className="vehicle-details-detail">
                  No insurance found for this vehicle.
                </p>
                <select
                  value={insuranceCompany}
                  onChange={(e) => setInsuranceCompany(e.target.value)}
                  className="vehicle-details-select"
                >
                  <option value="">Select Insurance Company</option>
                  {insuranceCompanies.map((company) => (
                    <option key={company.value} value={company.value}>
                      {company.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddInsurance}
                  className="vehicle-details-add-button"
                  disabled={!insuranceCompany}
                >
                  Add Insurance
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="vehicle-details-button-container">
          <button
            onClick={() => navigate(`/edit-vehicle/${id}`)}
            className="vehicle-details-edit-button"
          >
            Edit Vehicle
          </button>
          <button
            onClick={handleDelete}
            className="vehicle-details-delete-button"
          >
            Delete Vehicle
          </button>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetails;
