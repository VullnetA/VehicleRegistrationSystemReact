import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "./fetchWithAuth";
import Header from "./Header";
import "../style/Vehicle.css";

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
        fetchData("https://localhost:7221/api/Vehicle");
        fetchCounts();
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
    <div>
      <Header onLogout={() => console.log("Logged out")} />
      <div className="vehicle-container">
        <div className="vehicle-header">
          <h1 className="vehicle-title">Vehicles</h1>
          <div className="vehicle-search-container">
            <label htmlFor="searchType" className="vehicle-search-label">
              Search By:{" "}
            </label>
            <select
              id="searchType"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="vehicle-search-select"
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
              <form onSubmit={handleSearch} className="vehicle-search-form">
                <label htmlFor="searchQuery" className="vehicle-search-label">
                  Enter {searchType === "id" ? "ID" : searchType}:
                </label>
                <input
                  id="searchQuery"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="vehicle-search-input"
                />
                <button type="submit" className="vehicle-search-button">
                  Search
                </button>
              </form>
            )}
          </div>
          <div className="vehicle-counts-container">
            <div className="vehicle-count-box">
              <h3>Total Registered Vehicles</h3>
              <p>{registeredCount}</p>
            </div>
            <div className="vehicle-count-box">
              <h3>Total Unregistered Vehicles</h3>
              <p>{unregisteredCount}</p>
            </div>
          </div>
        </div>
        {error && <p className="vehicle-error">{error}</p>}
        <table className="vehicle-table">
          <thead>
            <tr>
              <th className="vehicle-th">Manufacturer</th>
              <th className="vehicle-th">Model</th>
              <th className="vehicle-th">Year</th>
              <th className="vehicle-th">Category</th>
              <th className="vehicle-th">License Plate</th>
              <th className="vehicle-th">Registration Status</th>
              <th className="vehicle-th">Date Registered</th>
              <th className="vehicle-th">Expiration Date</th>
              <th className="vehicle-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles?.map((vehicle) => (
              <tr key={vehicle.id} className="vehicle-tr">
                <td className="vehicle-td">{vehicle.manufacturer}</td>
                <td className="vehicle-td">{vehicle.model}</td>
                <td className="vehicle-td">{vehicle.year}</td>
                <td className="vehicle-td">{categoryEnum[vehicle.category]}</td>
                <td className="vehicle-td">{vehicle.licensePlate}</td>
                <td className="vehicle-td">
                  {vehicle.isRegistered ? (
                    "Registered"
                  ) : (
                    <span className="vehicle-not-registered">
                      Not Registered
                    </span>
                  )}
                </td>
                <td className="vehicle-td">
                  {vehicle.isRegistered
                    ? formatDate(vehicle.dateRegistered)
                    : "N/A"}
                </td>
                <td className="vehicle-td">
                  {vehicle.isRegistered
                    ? formatDate(vehicle.expirationDate)
                    : "N/A"}
                </td>
                <td className="vehicle-td">
                  <button
                    onClick={() => navigate(`/vehicle/${vehicle.id}`)}
                    className="vehicle-button"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => navigate(`/edit-vehicle/${vehicle.id}`)}
                    className="vehicle-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(vehicle.id)}
                    className="vehicle-delete-button"
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

export default Vehicle;
