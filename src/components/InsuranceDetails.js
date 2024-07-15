import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "./fetchWithAuth"; // Import the fetchWithAuth function

function InsuranceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [insurance, setInsurance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsurance = async () => {
      try {
        const response = await fetchWithAuth(
          `https://localhost:7221/insurance/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setInsurance(data);
        } else {
          setError("Failed to fetch insurance details");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    };

    fetchInsurance();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetchWithAuth(
        `https://localhost:7221/insurance/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        navigate(`/vehicle/${insurance.vehicle.id}`); // Redirect to the vehicle details page
      } else {
        setError("Failed to delete insurance");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  if (error) {
    return <div style={errorStyle}>{error}</div>;
  }

  if (!insurance) {
    return <div style={loadingStyle}>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Insurance Details</h1>
      <div style={contentContainerStyle}>
        <p style={detailStyle}>
          <strong>Insurance Company:</strong> {insurance.insuranceCompany}
        </p>
        <p style={detailStyle}>
          <strong>Insurance Fee:</strong> {insurance.insuranceFee}
        </p>
        <p style={detailStyle}>
          <strong>Date Registered:</strong>{" "}
          {new Date(insurance.dateRegistered).toLocaleDateString()}
        </p>
        <p style={detailStyle}>
          <strong>Expiration Date:</strong>{" "}
          {new Date(insurance.expirationDate).toLocaleDateString()}
        </p>
        <button onClick={handleDelete} style={deleteButtonStyle}>
          Delete Insurance
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
  flexDirection: "column",
  alignItems: "center",
};

const detailStyle = {
  marginBottom: "10px",
  color: "#333",
  fontSize: "1.1em",
  textAlign: "left",
  width: "100%",
  maxWidth: "500px",
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

const deleteButtonStyle = {
  padding: "10px 20px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#f44336",
  color: "#fff",
  cursor: "pointer",
  marginTop: "20px",
  fontSize: "1em",
  fontWeight: "bold",
  textAlign: "center",
};

export default InsuranceDetails;
