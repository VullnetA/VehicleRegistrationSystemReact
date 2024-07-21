import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "./fetchWithAuth";
import Header from "./Header";
import "../style/EditForm.css";

function EditOwner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
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
          setEmail(data.email || "");
          setPhone(data.phone || "");
          setAddress(data.address || "");
        } else {
          setError("Failed to fetch owner details");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    };
    fetchOwner();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedOwner = {
      email,
      phone,
      address,
    };

    try {
      const response = await fetchWithAuth(
        `https://localhost:7221/owner/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedOwner),
        }
      );

      if (response.ok) {
        navigate(`/owner/${id}`);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update owner");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  if (error) {
    return <div className="edit-error">{error}</div>;
  }

  if (!owner) {
    return <div className="edit-loading">Loading...</div>;
  }

  return (
    <div>
      <Header onLogout={() => console.log("Logged out")} />
      <div className="edit-container">
        <h1 className="edit-title">Edit Owner</h1>
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="edit-form-group">
            <label className="edit-label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="edit-input"
            />
          </div>
          <div className="edit-form-group">
            <label className="edit-label">Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="edit-input"
            />
          </div>
          <div className="edit-form-group">
            <label className="edit-label">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="edit-input"
            />
          </div>
          <button type="submit" className="edit-button">
            Update Owner
          </button>
        </form>
        {error && <p className="edit-error">{error}</p>}
      </div>
    </div>
  );
}

export default EditOwner;
