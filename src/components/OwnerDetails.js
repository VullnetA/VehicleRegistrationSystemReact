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
    return <div>{error}</div>;
  }

  if (!owner) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Owner Details</h1>
      <p>ID: {owner.id}</p>
      <p>First Name: {owner.firstName}</p>
      <p>Last Name: {owner.lastName}</p>
      <p>Date of Birth: {new Date(owner.dateOfBirth).toLocaleDateString()}</p>
      <p>Gender: {owner.gender === 0 ? "Male" : "Female"}</p>
      <p>Email: {owner.email}</p>
      <p>Phone: {owner.phone}</p>
      <p>Address: {owner.address}</p>
      <p>
        License Issue Date:{" "}
        {new Date(owner.licenseIssueDate).toLocaleDateString()}
      </p>
      <button onClick={handleDelete}>Delete Owner</button>
      <button onClick={() => navigate(`/edit-owner/${id}`)}>Edit Owner</button>
    </div>
  );
}

export default OwnerDetails;
