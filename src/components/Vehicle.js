import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "./fetchWithAuth"; // Import the fetchWithAuth function

function Vehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [registeredCount, setRegisteredCount] = useState(0);
  const [unregisteredCount, setUnregisteredCount] = useState(0);
  const [searchType, setSearchType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const categoryEnum = [
    "Motorcycle",
    "Hatchback",
    "Coupe",
    "Sedan",
    "Van",
    "SUV",
    "Truck",
    "Bus",
  ];

  const fetchVehicleRegistrationStatus = async (id) => {
    try {
      const response = await fetchWithAuth(
        `https://localhost:7221/checkregistration/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        setError(`Failed to fetch registration status for vehicle ${id}`);
        return null;
      }
    } catch (error) {
      setError(
        `An error occurred while fetching registration status for vehicle ${id}. Please try again.`
      );
      return null;
    }
  };

  const fetchData = async (url) => {
    try {
      const response = await fetchWithAuth(url);
      if (response.ok) {
        const data = await response.json();
        let vehiclesArray = Array.isArray(data) ? data : [data];

        // Fetch registration status for each vehicle
        const vehiclesWithStatus = await Promise.all(
          vehiclesArray.map(async (vehicle) => {
            const isRegistered = await fetchVehicleRegistrationStatus(
              vehicle.id
            );
            return { ...vehicle, isRegistered };
          })
        );

        setVehicles(vehiclesWithStatus);
      } else {
        setError("Failed to fetch vehicles");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  const fetchCounts = async () => {
    try {
      const registeredResponse = await fetchWithAuth(
        "https://localhost:7221/countregistered"
      );
      if (registeredResponse.ok) {
        const registeredData = await registeredResponse.json();
        setRegisteredCount(registeredData);
      } else {
        setError("Failed to fetch registered vehicles count");
      }

      const unregisteredResponse = await fetchWithAuth(
        "https://localhost:7221/countunregistered"
      );
      if (unregisteredResponse.ok) {
        const unregisteredData = await unregisteredResponse.json();
        setUnregisteredCount(unregisteredData);
      } else {
        setError("Failed to fetch unregistered vehicles count");
      }
    } catch (error) {
      setError("An error occurred while fetching counts. Please try again.");
    }
  };

  useEffect(() => {
    fetchData("https://localhost:7221/api/Vehicle");
    fetchCounts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetchWithAuth(
        `https://localhost:7221/vehicle/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchData("https://localhost:7221/api/Vehicle"); // Refresh the list after deletion
        fetchCounts(); // Refresh the counts after deletion
      } else {
        setError("Failed to delete vehicle");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let url = "https://localhost:7221/api/Vehicle";
    switch (searchType) {
      case "id":
        url = `https://localhost:7221/vehicle/${searchQuery}`;
        break;
      case "owner":
        url = `https://localhost:7221/vehiclesbyowner/${searchQuery}`;
        break;
      case "year":
        url = `https://localhost:7221/vehiclesbyyear/${searchQuery}`;
        break;
      case "power":
        url = `https://localhost:7221/vehiclespower/${searchQuery}`;
        break;
      case "fuel":
        url = `https://localhost:7221/vehiclesbyfuel/${searchQuery}`;
        break;
      case "brand":
        url = `https://localhost:7221/vehiclesbybrand/${searchQuery}`;
        break;
      case "licensePlate":
        url = `https://localhost:7221/licenseplate/${searchQuery}`;
        break;
      default:
        url = "https://localhost:7221/api/Vehicle";
    }
    fetchData(url);
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Vehicles</h1>
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
            <option value="Vehicle ID">ID</option>
            <option value="Owner ID">Owner</option>
            <option value="Year">Year</option>
            <option value="Horsepower">Horsepower</option>
            <option value="Fuel">Fuel Type</option>
            <option value="Brand">Brand</option>
            <option value="License Plate">License Plate</option>
          </select>
          {searchType && (
            <form onSubmit={handleSearch} style={searchFormStyle}>
              <label htmlFor="searchQuery" style={searchLabelStyle}>
                Enter {searchType === "id" ? "ID" : searchType}:
              </label>
              <input
                id="searchQuery"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={searchInputStyle}
              />
              <button type="submit" style={searchButtonStyle}>
                Search
              </button>
            </form>
          )}
        </div>
        <div style={countsContainerStyle}>
          <div style={countBoxStyle}>
            <h3>Total Registered Vehicles</h3>
            <p>{registeredCount}</p>
          </div>
          <div style={countBoxStyle}>
            <h3>Total Unregistered Vehicles</h3>
            <p>{unregisteredCount}</p>
          </div>
        </div>
      </div>
      {error && <p style={errorStyle}>{error}</p>}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Manufacturer</th>
            <th style={thStyle}>Model</th>
            <th style={thStyle}>Year</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>License Plate</th>
            <th style={thStyle}>Registration Status</th>
            <th style={thStyle}>Date Registered</th>
            <th style={thStyle}>Expiration Date</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles?.map((vehicle) => (
            <tr key={vehicle.id} style={trStyle}>
              <td style={tdStyle}>{vehicle.manufacturer}</td>
              <td style={tdStyle}>{vehicle.model}</td>
              <td style={tdStyle}>{vehicle.year}</td>
              <td style={tdStyle}>{categoryEnum[vehicle.category]}</td>
              <td style={tdStyle}>{vehicle.licensePlate}</td>
              <td style={tdStyle}>
                {vehicle.isRegistered ? (
                  "Registered"
                ) : (
                  <span style={notRegisteredStyle}>Not Registered</span>
                )}
              </td>
              <td style={tdStyle}>
                {vehicle.isRegistered
                  ? formatDate(vehicle.dateRegistered)
                  : "N/A"}
              </td>
              <td style={tdStyle}>
                {vehicle.isRegistered
                  ? formatDate(vehicle.expirationDate)
                  : "N/A"}
              </td>
              <td style={tdStyle}>
                <button
                  onClick={() => navigate(`/vehicle/${vehicle.id}`)}
                  style={buttonStyle}
                >
                  Details
                </button>
                <button
                  onClick={() => navigate(`/edit-vehicle/${vehicle.id}`)}
                  style={buttonStyle}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(vehicle.id)}
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
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const titleStyle = {
  margin: 0,
  color: "#333",
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
};

const searchInputStyle = {
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginRight: "10px",
};

const searchButtonStyle = {
  padding: "10px 20px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
};

const countsContainerStyle = {
  display: "flex",
  gap: "20px", // Space between the count boxes
  justifyContent: "flex-end", // Align the count boxes to the right
};

const countBoxStyle = {
  backgroundColor: "#f8f9fa",
  padding: "10px 20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  width: "200px", // Ensures both boxes are the same width
  textAlign: "center",
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
};

const notRegisteredStyle = {
  color: "red",
  fontWeight: "bold",
};

export default Vehicle;
