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
    <div>
      <h1>Owners</h1>

      <div>
        <label htmlFor="searchType">Search By: </label>
        <select
          id="searchType"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="city">City</option>
          <option value="vehicle">Vehicle</option>
        </select>
      </div>

      {searchType && (
        <form onSubmit={handleSearch}>
          <label htmlFor="searchQuery">
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
          />
          {searchType === "vehicle" && (
            <div>
              <label htmlFor="vehicleModel">Model:</label>
              <input
                id="vehicleModel"
                type="text"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
              />
            </div>
          )}
          <button type="submit">Search</button>
        </form>
      )}

      <ul>
        {owners?.map((owner) => (
          <li key={owner.id}>
            {owner.firstName} {owner.lastName}
            <button onClick={() => navigate(`/owner/${owner.id}`)}>
              Details
            </button>
            <button onClick={() => navigate(`/edit-owner/${owner.id}`)}>
              Edit
            </button>
            <button onClick={() => handleDelete(owner.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Owner;
