import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "./fetchWithAuth"; // Import the fetchWithAuth function

function Owner() {
  const [owners, setOwners] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async (url) => {
    try {
      const response = await fetchWithAuth(url);
      if (response.ok) {
        const data = await response.json();
        // Check if the response is an array or a single object
        let ownersArray = [];
        if (Array.isArray(data)) {
          ownersArray = data;
        } else {
          ownersArray = [data];
        }

        setOwners(ownersArray);
      } else {
        setError("Failed to fetch owners");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchData("https://localhost:7221/api/Owner");
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetchWithAuth(
        `https://localhost:7221/owner/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchData("https://localhost:7221/api/Owner"); // Refresh the list after deletion
      } else {
        setError("Failed to delete owner");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let url = "https://localhost:7221/api/Owner";
    switch (searchType) {
      case "id":
        url = `https://localhost:7221/owner/${searchQuery}`;
        break;
      case "name":
        url = `https://localhost:7221/searchByName/${searchQuery}`;
        break;
      case "city":
        url = `https://localhost:7221/findByCity/${searchQuery}`;
        break;
      case "vehicle":
        url = `https://localhost:7221/findByVehicle/${searchQuery}/${vehicleModel}`;
        break;
      default:
        url = "https://localhost:7221/api/Owner";
    }
    fetchData(url);
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Owners</h1>
        <div style={searchContainerStyle}>
          <label htmlFor="searchType" style={searchLabelStyle}>
            Search By:{" "}
          </label>
          <select
            id="searchType"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            style={searchSelectStyle}
          >
            <option value="">Select</option>
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="city">City</option>
            <option value="vehicle">Vehicle</option>
          </select>
        </div>
        {searchType && (
          <form onSubmit={handleSearch} style={searchFormStyle}>
            <label htmlFor="searchQuery" style={searchLabelStyle}>
              Enter{" "}
              {searchType === "id"
                ? "ID"
                : searchType === "vehicle"
                ? "Manufacturer"
                : searchType}
              :
            </label>
            <input
              id="searchQuery"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={searchInputStyle}
            />
            {searchType === "vehicle" && (
              <div>
                <label htmlFor="vehicleModel" style={searchLabelStyle}>
                  Model:
                </label>
                <input
                  id="vehicleModel"
                  type="text"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  style={searchInputStyle}
                />
              </div>
            )}
            <button type="submit" style={searchButtonStyle}>
              Search
            </button>
          </form>
        )}
      </div>

      {error && <p style={errorStyle}>{error}</p>}

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>First Name</th>
            <th style={thStyle}>Last Name</th>
            <th style={thStyle}>Date of Birth</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>License Issue Date</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {owners?.map((owner) => (
            <tr key={owner.id} style={trStyle}>
              <td style={tdStyle}>{owner.firstName}</td>
              <td style={tdStyle}>{owner.lastName}</td>
              <td style={tdStyle}>
                {new Date(owner.dateOfBirth).toLocaleDateString()}
              </td>
              <td style={tdStyle}>{owner.phone}</td>
              <td style={tdStyle}>{owner.address}</td>
              <td style={tdStyle}>
                {new Date(owner.licenseIssueDate).toLocaleDateString()}
              </td>
              <td style={tdStyle}>
                <button
                  onClick={() => navigate(`/owner/${owner.id}`)}
                  style={buttonStyle}
                >
                  Details
                </button>
                <button
                  onClick={() => navigate(`/edit-owner/${owner.id}`)}
                  style={buttonStyle}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(owner.id)}
                  style={deleteButtonStyle}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const containerStyle = {
  marginLeft: "220px", // Adjusted to start after the sidebar
  marginTop: "80px", // Adjusted to start after the header
  padding: "20px 40px",
  borderRadius: "8px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const titleStyle = {
  color: "#333",
  fontSize: "2em",
  fontWeight: "bold",
};

const searchContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center", // Center the search section
  flex: 1, // Allow the search section to take available space
};

const searchLabelStyle = {
  marginBottom: "10px",
  color: "#333",
};

const searchSelectStyle = {
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginBottom: "10px",
};

const searchFormStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  marginBottom: "20px",
};

const searchInputStyle = {
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginRight: "10px",
  width: "100%",
  maxWidth: "400px",
  marginBottom: "10px",
};

const searchButtonStyle = {
  padding: "10px 20px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const thStyle = {
  borderBottom: "2px solid #ddd",
  padding: "10px",
  textAlign: "left",
};

const trStyle = {
  borderBottom: "1px solid #ddd",
};

const tdStyle = {
  padding: "10px",
  textAlign: "left",
};

const buttonStyle = {
  padding: "10px 20px", // Increased padding for larger buttons
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
  marginRight: "5px",
};

const deleteButtonStyle = {
  padding: "10px 20px", // Increased padding for larger buttons
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#f44336",
  color: "#fff",
  cursor: "pointer",
};

const errorStyle = {
  color: "red",
  textAlign: "center",
  marginTop: "20px",
};

export default Owner;
