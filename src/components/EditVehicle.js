import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "./fetchWithAuth"; // Import the fetchWithAuth function

function EditVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [licensePlate, setLicensePlate] = useState("");
  const [ownerId, setOwnerId] = useState("");
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
          setLicensePlate(data.licensePlate);
          setOwnerId(data.ownerId);
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
      ownerId: Number(ownerId),
    };

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
        setError(errorData.message || "Failed to update vehicle");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
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
      <h1 style={titleStyle}>Edit Vehicle</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
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
          <label style={labelStyle}>Owner ID:</label>
          <input
            type="number"
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Update Vehicle
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

const loadingStyle = {
  color: "#333",
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
const updateButtonHoverStyle = buttonHoverStyle(buttonStyle);

export default EditVehicle;
