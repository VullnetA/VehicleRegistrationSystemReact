import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "./fetchWithAuth"; // Import the fetchWithAuth function

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

  return (
    <div>
      <h1>Statistics</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h2>Vehicle Counts by Brand</h2>
      <ul>
        {brandCounts.slice(0, 10).map((item) => (
          <li key={item.brand}>
            {item.brand}: {item.count}
          </li>
        ))}
      </ul>
      <h2>Vehicle Counts by Transmission</h2>
      <ul>
        {transmissionCounts.slice(0, 10).map((item) => (
          <li key={item.transmission}>
            {item.transmission}: {item.count}
          </li>
        ))}
      </ul>
      <h2>Driver License Counts by City</h2>
      <ul>
        {licenseCountsByCity.slice(0, 10).map((item) => (
          <li key={item.city}>
            {item.city}: {item.count}
          </li>
        ))}
      </ul>
      <h2>Vehicle Counts by Fuel Type</h2>
      <ul>
        {fuelTypeCounts.slice(0, 10).map((item) => (
          <li key={item.fuel}>
            {item.fuel}: {item.count}
          </li>
        ))}
      </ul>
      <h2>Vehicle Counts by Year</h2>
      <ul>
        {yearCounts.slice(0, 10).map((item) => (
          <li key={item.year}>
            {item.year}: {item.count}
          </li>
        ))}
      </ul>
      <h2>Vehicle Counts by Category</h2>
      <ul>
        {categoryCounts.slice(0, 10).map((item) => (
          <li key={item.category}>
            {item.category}: {item.count}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Statistics;
