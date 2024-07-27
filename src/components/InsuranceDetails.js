import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "./fetchWithAuth";
import Header from "./Header";
import "../style/InsuranceDetails.css";

function InsuranceDetails({ onLogout }) {
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
        navigate(`/vehicle/${insurance.vehicle.id}`);
      } else {
        setError("Failed to delete insurance");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  if (error) {
    return <div className="insurance-error">{error}</div>;
  }

  if (!insurance) {
    return <div className="insurance-loading">Loading...</div>;
  }

  return (
    <div>
      <Header onLogout={onLogout} />
      <div className="insurance-container">
        <h1 className="insurance-title">Insurance Details</h1>
        <div className="insurance-contentContainer">
          <p className="insurance-detail">
            <strong>Insurance Company:</strong> {insurance.insuranceCompany}
          </p>
          <p className="insurance-detail">
            <strong>Insurance Fee:</strong> {insurance.insuranceFee}
          </p>
          <p className="insurance-detail">
            <strong>Date Registered:</strong>{" "}
            {new Date(insurance.dateRegistered).toLocaleDateString()}
          </p>
          <p className="insurance-detail">
            <strong>Expiration Date:</strong>{" "}
            {new Date(insurance.expirationDate).toLocaleDateString()}
          </p>
          <button onClick={handleDelete} className="insurance-deleteButton">
            Delete Insurance
          </button>
        </div>
      </div>
    </div>
  );
}

export default InsuranceDetails;
