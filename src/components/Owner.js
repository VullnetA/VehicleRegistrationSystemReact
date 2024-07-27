import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "./fetchWithAuth";
import Header from "./Header";
import "../style/Owner.css";

function Owner({ onLogout }) {
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
        fetchData("https://localhost:7221/api/Owner");
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
      <Header onLogout={onLogout} />
      <div className="owner-container">
        <div className="owner-header">
          <h1 className="owner-title">Owners</h1>
          <div className="owner-search-container">
            <label htmlFor="searchType" className="owner-search-label">
              Search By:{" "}
            </label>
            <select
              id="searchType"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="owner-search-select"
            >
              <option value="">Select</option>
              <option value="id">ID</option>
              <option value="name">Name</option>
              <option value="city">City</option>
              <option value="vehicle">Vehicle</option>
            </select>
          </div>
          {searchType && (
            <form onSubmit={handleSearch} className="owner-search-form">
              <label htmlFor="searchQuery" className="owner-search-label">
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
                className="owner-search-input"
              />
              {searchType === "vehicle" && (
                <div>
                  <label htmlFor="vehicleModel" className="owner-search-label">
                    Model:
                  </label>
                  <input
                    id="vehicleModel"
                    type="text"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="owner-search-input"
                  />
                </div>
              )}
              <button type="submit" className="owner-search-button">
                Search
              </button>
            </form>
          )}
        </div>

        {error && <p className="owner-error">{error}</p>}

        <table className="owner-table">
          <thead>
            <tr>
              <th className="owner-th">First Name</th>
              <th className="owner-th">Last Name</th>
              <th className="owner-th">Date of Birth</th>
              <th className="owner-th">Phone</th>
              <th className="owner-th">Address</th>
              <th className="owner-th">License Issue Date</th>
              <th className="owner-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {owners?.map((owner) => (
              <tr key={owner.id} className="owner-tr">
                <td className="owner-td">{owner.firstName}</td>
                <td className="owner-td">{owner.lastName}</td>
                <td className="owner-td">
                  {new Date(owner.dateOfBirth).toLocaleDateString()}
                </td>
                <td className="owner-td">{owner.phone}</td>
                <td className="owner-td">{owner.address}</td>
                <td className="owner-td">
                  {new Date(owner.licenseIssueDate).toLocaleDateString()}
                </td>
                <td className="owner-td">
                  <button
                    onClick={() => navigate(`/owner/${owner.id}`)}
                    className="owner-button"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => navigate(`/edit-owner/${owner.id}`)}
                    className="owner-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(owner.id)}
                    className="owner-delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Owner;
