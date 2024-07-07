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

  return (
    <div>
      <h1>Vehicles</h1>

      <div>
        <h3>Total number of registered vehicles: {registeredCount}</h3>
        <h3>Total number of unregistered vehicles: {unregisteredCount}</h3>
      </div>

      <div>
        <label htmlFor="searchType">Search By: </label>
        <select
          id="searchType"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="id">ID</option>
          <option value="owner">Owner</option>
          <option value="year">Year</option>
          <option value="power">Horsepower</option>
          <option value="fuel">Fuel Type</option>
          <option value="brand">Brand</option>
          <option value="licensePlate">License Plate</option>
        </select>
      </div>

      {searchType && (
        <form onSubmit={handleSearch}>
          <label htmlFor="searchQuery">
            Enter {searchType === "id" ? "ID" : searchType}:
          </label>
          <input
            id="searchQuery"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      )}

      <ul>
        {vehicles?.map((vehicle) => (
          <li key={vehicle.id}>
            {vehicle.manufacturer} - {vehicle.model} -{" "}
            {vehicle.isRegistered ? "Registered" : "Unregistered"}
            <button onClick={() => navigate(`/vehicle/${vehicle.id}`)}>
              Details
            </button>
            <button onClick={() => navigate(`/edit-vehicle/${vehicle.id}`)}>
              Edit
            </button>
            <button onClick={() => handleDelete(vehicle.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Vehicle;
