import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "./fetchWithAuth"; // Import the fetchWithAuth function

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
    return <div style={errorStyle}>{error}</div>;
  }

  if (!owner) {
    return <div style={loadingStyle}>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Edit Owner</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Update Owner
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

export default EditOwner;
