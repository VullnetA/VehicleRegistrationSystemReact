import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "./fetchWithAuth"; // Import the fetchWithAuth function

function OwnerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const response = await fetchWithAuth(
          `https://localhost:7221/owner/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setOwner(data);
        } else {
          setError("Failed to fetch owner details");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    };
    fetchOwner();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetchWithAuth(
        `https://localhost:7221/owner/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        navigate("/owners");
      } else {
        setError("Failed to delete owner");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  if (error) {
    return <div style={errorStyle}>{error}</div>;
  }

  if (!owner) {
    return <div style={loadingStyle}>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Owner Details</h1>
      <div style={contentContainerStyle}>
        <div style={columnStyle}>
          <p style={detailStyle}>
            <strong>ID:</strong> {owner.id}
          </p>
          <p style={detailStyle}>
            <strong>First Name:</strong> {owner.firstName}
          </p>
          <p style={detailStyle}>
            <strong>Last Name:</strong> {owner.lastName}
          </p>
          <p style={detailStyle}>
            <strong>Date of Birth:</strong>{" "}
            {new Date(owner.dateOfBirth).toLocaleDateString()}
          </p>
          <p style={detailStyle}>
            <strong>Gender:</strong> {owner.gender === 0 ? "Male" : "Female"}
          </p>
          <p style={detailStyle}>
            <strong>Email:</strong> {owner.email}
          </p>
          <p style={detailStyle}>
            <strong>Phone:</strong> {owner.phone}
          </p>
          <p style={detailStyle}>
            <strong>Address:</strong> {owner.address}
          </p>
          <p style={detailStyle}>
            <strong>License Issue Date:</strong>{" "}
            {new Date(owner.licenseIssueDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div style={buttonContainerStyle}>
        <button
          onClick={() => navigate(`/edit-owner/${id}`)}
          style={editButtonStyle}
        >
          Edit Owner
        </button>
        <button onClick={handleDelete} style={deleteButtonStyle}>
          Delete Owner
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
  justifyContent: "center",
  marginBottom: "20px",
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

export default OwnerDetails;
