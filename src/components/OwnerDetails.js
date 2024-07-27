import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "./fetchWithAuth";
import Header from "./Header";
import "../style/OwnerDetails.css";

function OwnerDetails({ onLogout }) {
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
    return <div className="owner-details-error">{error}</div>;
  }

  if (!owner) {
    return <div className="owner-details-loading">Loading...</div>;
  }

  return (
    <div>
      <Header onLogout={onLogout} />
      <div className="owner-details-container">
        <h1 className="owner-details-title">Owner Details</h1>
        <div className="owner-details-content-container">
          <div className="owner-details-column">
            <p className="owner-details-detail">
              <strong>ID:</strong> {owner.id}
            </p>
            <p className="owner-details-detail">
              <strong>First Name:</strong> {owner.firstName}
            </p>
            <p className="owner-details-detail">
              <strong>Last Name:</strong> {owner.lastName}
            </p>
            <p className="owner-details-detail">
              <strong>Date of Birth:</strong>{" "}
              {new Date(owner.dateOfBirth).toLocaleDateString()}
            </p>
            <p className="owner-details-detail">
              <strong>Gender:</strong> {owner.gender === 0 ? "Male" : "Female"}
            </p>
            <p className="owner-details-detail">
              <strong>Email:</strong> {owner.email}
            </p>
            <p className="owner-details-detail">
              <strong>Phone:</strong> {owner.phone}
            </p>
            <p className="owner-details-detail">
              <strong>Address:</strong> {owner.address}
            </p>
            <p className="owner-details-detail">
              <strong>License Issue Date:</strong>{" "}
              {new Date(owner.licenseIssueDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="owner-details-button-container">
          <button
            onClick={() => navigate(`/edit-owner/${id}`)}
            className="owner-details-edit-button"
          >
            Edit Owner
          </button>
          <button
            onClick={handleDelete}
            className="owner-details-delete-button"
          >
            Delete Owner
          </button>
        </div>
      </div>
    </div>
  );
}

export default OwnerDetails;
