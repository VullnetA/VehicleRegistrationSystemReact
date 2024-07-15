import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "./fetchWithAuth"; // Import the fetchWithAuth function

function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [error, setError] = useState(null);
  const [insuranceCompany, setInsuranceCompany] = useState(""); // State for selected insurance company

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
          // Check if the insurance data is meaningful
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
          setInsurance(null); // Set insurance to null if not found
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
        // Fetch the newly added insurance details
        const fetchNewInsurance = async () => {
          try {
            const newInsuranceResponse = await fetchWithAuth(
              `https://localhost:7221/insurance/vehicle/${id}`
            );
            if (newInsuranceResponse.ok) {
              const newInsuranceData = await newInsuranceResponse.json();
              navigate(`/insurance/${newInsuranceData.id}`); // Redirect to the insurance details page
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
    return <div style={errorStyle}>{error}</div>;
  }

  if (!vehicle) {
    return <div style={loadingStyle}>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Vehicle Details</h1>
      <div style={contentContainerStyle}>
        <div style={columnStyle}>
          <h2 style={subTitleStyle}>Vehicle Information</h2>
          <p style={detailStyle}>
            <strong>ID:</strong> {vehicle.id}
          </p>
          <p style={detailStyle}>
            <strong>Manufacturer:</strong> {vehicle.manufacturer}
          </p>
          <p style={detailStyle}>
            <strong>Model:</strong> {vehicle.model}
          </p>
          <p style={detailStyle}>
            <strong>Year:</strong> {vehicle.year}
          </p>
          <p style={detailStyle}>
            <strong>Category:</strong> {categoryEnum[vehicle.category]}
          </p>
          <p style={detailStyle}>
            <strong>License Plate:</strong> {vehicle.licensePlate}
          </p>
          <p style={detailStyle}>
            <strong>Date Registered:</strong>{" "}
            {new Date(vehicle.dateRegistered).toLocaleDateString()}
          </p>
          <p style={detailStyle}>
            <strong>Expiration Date:</strong>{" "}
            {new Date(vehicle.expirationDate).toLocaleDateString()}
          </p>
        </div>
        <div style={columnStyle}>
          <h2 style={subTitleStyle}>Owner Details</h2>
          <p style={detailStyle}>
            <strong>ID:</strong> {vehicle.owner.id}
          </p>
          <p style={detailStyle}>
            <strong>Name:</strong> {vehicle.owner.firstName}{" "}
            {vehicle.owner.lastName}
          </p>
          <p style={detailStyle}>
            <strong>License Issue Date:</strong>{" "}
            {new Date(vehicle.owner.licenseIssueDate).toLocaleDateString()}
          </p>
          <h2 style={subTitleStyle}>Insurance Status</h2>
          {insurance ? (
            <div>
              <p style={detailStyle}>This vehicle has registered insurance.</p>
              <button
                onClick={() => navigate(`/insurance/${insurance.id}`)}
                style={viewButtonStyle}
              >
                View Insurance Details
              </button>
            </div>
          ) : (
            <div>
              <p style={detailStyle}>No insurance found for this vehicle.</p>
              <select
                value={insuranceCompany}
                onChange={(e) => setInsuranceCompany(e.target.value)}
                style={selectStyle}
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
                style={addButtonStyle}
                disabled={!insuranceCompany} // Disable the button if no company is selected
              >
                Add Insurance
              </button>
            </div>
          )}
        </div>
      </div>
      <div style={buttonContainerStyle}>
        <button
          onClick={() => navigate(`/edit-vehicle/${id}`)}
          style={editButtonStyle}
        >
          Edit Vehicle
        </button>
        <button onClick={handleDelete} style={deleteButtonStyle}>
          Delete Vehicle
        </button>
      </div>
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

const contentContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px", // Add margin-bottom to separate from the buttons
};

const columnStyle = {
  flex: 1,
  marginRight: "20px",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const detailStyle = {
  marginBottom: "10px",
  color: "#333",
};

const subTitleStyle = {
  marginTop: "20px",
  marginBottom: "10px",
  color: "#333",
  fontSize: "1.5em",
  fontWeight: "bold",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center", // Center the buttons
  gap: "20px",
  marginTop: "20px",
};

const editButtonStyle = {
  padding: "10px 20px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const deleteButtonStyle = {
  padding: "10px 20px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#f44336",
  color: "#fff",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const viewButtonStyle = {
  padding: "10px 20px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  marginTop: "10px",
};

const addButtonStyle = {
  padding: "10px 20px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#28a745",
  color: "#fff",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  marginTop: "10px",
};

const selectStyle = {
  padding: "10px",
  marginTop: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "100%",
};

const errorStyle = {
  color: "red",
  textAlign: "center",
  marginTop: "20px",
};

const loadingStyle = {
  color: "#333",
  textAlign: "center",
  marginTop: "20px",
};

export default VehicleDetails;
