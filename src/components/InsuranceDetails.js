import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function InsuranceDetails() {
  const { id } = useParams();
  const [insurance, setInsurance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsurance = async () => {
      try {
        const response = await fetch(`https://localhost:7221/insurance/${id}`);
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

  if (error) {
    return <div>{error}</div>;
  }

  if (!insurance) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Insurance Details</h1>
      <p>Insurance Company: {insurance.insuranceCompany}</p>
      <p>Insurance Fee: {insurance.insuranceFee}</p>
      <p>
        Date Registered:{" "}
        {new Date(insurance.dateRegistered).toLocaleDateString()}
      </p>
      <p>
        Expiration Date:{" "}
        {new Date(insurance.expirationDate).toLocaleDateString()}
      </p>
    </div>
  );
}

export default InsuranceDetails;
