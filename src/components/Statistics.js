import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "./fetchWithAuth";
import Header from "./Header";
import "../style/Statistics.css";

function Statistics() {
  const [brandCounts, setBrandCounts] = useState([]);
  const [transmissionCounts, setTransmissionCounts] = useState([]);
  const [licenseCountsByCity, setLicenseCountsByCity] = useState([]);
  const [fuelTypeCounts, setFuelTypeCounts] = useState([]);
  const [yearCounts, setYearCounts] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [error, setError] = useState(null);

  const carBrands = [
    "Toyota",
    "Ford",
    "Chevrolet",
    "Seat",
    "Audi",
    "BMW",
    "Mercedes",
    "Volkswagen",
  ];
  const transmissions = ["Manual", "Automatic", "Semiautomatic", "CVT"];
  const cities = [
    "Skopje",
    "Bitola",
    "Kumanovo",
    "Prilep",
    "Tetovo",
    "Veles",
    "Ohrid",
    "Gostivar",
    "Strumica",
    "Kavadarci",
    "Kocani",
    "Kicevo",
    "Struga",
    "Radovis",
    "Gevgelija",
    "Debar",
    "Sveti Nikole",
    "Negotino",
    "Kriva Palanka",
    "Berovo",
    "Delcevo",
    "Vinica",
    "Resen",
    "Probistip",
    "Demir Hisar",
    "Makedonski Brod",
    "Pehcevo",
    "Kratovo",
    "Valandovo",
    "Bogdanci",
    "Demir Kapija",
    "Dojran",
  ];
  const fuelTypes = ["Petrol", "Diesel", "BioDiesel", "Ethanol"];
  const categories = [
    "Motorcycle",
    "Hatchback",
    "Coupe",
    "Sedan",
    "Van",
    "SUV",
    "Truck",
    "Bus",
  ];
  const years = Array.from({ length: 30 }, (_, i) => 1990 + i);

  const fetchBrandCounts = async () => {
    try {
      const counts = await Promise.all(
        carBrands.map(async (brand) => {
          const response = await fetchWithAuth(
            `https://localhost:7221/countbybrand/${brand}`
          );
          if (response.ok) {
            const count = await response.json();
            return { brand, count };
          } else {
            return { brand, count: "Failed to fetch" };
          }
        })
      );
      counts.sort((a, b) => b.count - a.count);
      setBrandCounts(counts);
    } catch (error) {
      setError(
        "An error occurred while fetching brand counts. Please try again."
      );
    }
  };

  const fetchTransmissionCounts = async () => {
    try {
      const counts = await Promise.all(
        transmissions.map(async (transmission) => {
          const response = await fetchWithAuth(
            `https://localhost:7221/counttransmission/${transmission}`
          );
          if (response.ok) {
            const count = await response.json();
            return { transmission, count };
          } else {
            return { transmission, count: "Failed to fetch" };
          }
        })
      );
      counts.sort((a, b) => b.count - a.count);
      setTransmissionCounts(counts);
    } catch (error) {
      setError(
        "An error occurred while fetching transmission counts. Please try again."
      );
    }
  };

  const fetchLicenseCountsByCity = async () => {
    try {
      const counts = await Promise.all(
        cities.map(async (city) => {
          const response = await fetchWithAuth(
            `https://localhost:7221/licensesByCity/${city}`
          );
          if (response.ok) {
            const count = await response.json();
            return { city, count };
          } else {
            return { city, count: "Failed to fetch" };
          }
        })
      );
      counts.sort((a, b) => b.count - a.count);
      setLicenseCountsByCity(counts);
    } catch (error) {
      setError(
        "An error occurred while fetching license counts by city. Please try again."
      );
    }
  };

  const fetchFuelTypeCounts = async () => {
    try {
      const counts = await Promise.all(
        fuelTypes.map(async (fuel) => {
          const response = await fetchWithAuth(
            `https://localhost:7221/countbyfueltype/${fuel}`
          );
          if (response.ok) {
            const count = await response.json();
            return { fuel, count };
          } else {
            return { fuel, count: "Failed to fetch" };
          }
        })
      );
      counts.sort((a, b) => b.count - a.count);
      setFuelTypeCounts(counts);
    } catch (error) {
      setError(
        "An error occurred while fetching fuel type counts. Please try again."
      );
    }
  };

  const fetchYearCounts = async () => {
    try {
      const counts = await Promise.all(
        years.map(async (year) => {
          const response = await fetchWithAuth(
            `https://localhost:7221/countbyyear/${year}`
          );
          if (response.ok) {
            const count = await response.json();
            return { year, count };
          } else {
            return { year, count: "Failed to fetch" };
          }
        })
      );
      counts.sort((a, b) => b.count - a.count);
      setYearCounts(counts);
    } catch (error) {
      setError(
        "An error occurred while fetching year counts. Please try again."
      );
    }
  };

  const fetchCategoryCounts = async () => {
    try {
      const counts = await Promise.all(
        categories.map(async (category) => {
          const response = await fetchWithAuth(
            `https://localhost:7221/countbycategory/${category}`
          );
          if (response.ok) {
            const count = await response.json();
            return { category, count };
          } else {
            return { category, count: "Failed to fetch" };
          }
        })
      );
      counts.sort((a, b) => b.count - a.count);
      setCategoryCounts(counts);
    } catch (error) {
      setError(
        "An error occurred while fetching category counts. Please try again."
      );
    }
  };

  useEffect(() => {
    fetchBrandCounts();
    fetchTransmissionCounts();
    fetchLicenseCountsByCity();
    fetchFuelTypeCounts();
    fetchYearCounts();
    fetchCategoryCounts();
  }, []);

  const renderTable = (data, title) => (
    <div className="stats-section">
      <h2 className="stats-section-title">{title}</h2>
      <table className="stats-table">
        <thead>
          <tr>
            <th className="stats-th">Type</th>
            <th className="stats-th stats-th-count">Count</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 10).map((item) => (
            <tr
              key={
                item.brand ||
                item.transmission ||
                item.city ||
                item.fuel ||
                item.year ||
                item.category
              }
              className="stats-tr"
            >
              <td className="stats-td">
                {item.brand ||
                  item.transmission ||
                  item.city ||
                  item.fuel ||
                  item.year ||
                  item.category}
              </td>
              <td className="stats-td stats-td-count">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <Header onLogout={() => console.log("Logged out")} />
      <div className="stats-container">
        <h1 className="stats-title">Statistics</h1>
        {error && <p className="stats-error">{error}</p>}
        <div className="stats-row">
          {renderTable(brandCounts, "Vehicle Counts by Brand")}
          {renderTable(transmissionCounts, "Vehicle Counts by Transmission")}
        </div>
        <div className="stats-row">
          {renderTable(licenseCountsByCity, "Driver License Counts by City")}
          {renderTable(fuelTypeCounts, "Vehicle Counts by Fuel Type")}
        </div>
        <div className="stats-row">
          {renderTable(yearCounts, "Vehicle Counts by Year")}
          {renderTable(categoryCounts, "Vehicle Counts by Category")}
        </div>
      </div>
    </div>
  );
}

export default Statistics;
