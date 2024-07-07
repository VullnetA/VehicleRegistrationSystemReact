import React, { useState, useEffect } from "react";

function Statistics() {
  const [brandCounts, setBrandCounts] = useState([]);
  const [transmissionCounts, setTransmissionCounts] = useState([]);
  const [licenseCountsByCity, setLicenseCountsByCity] = useState([]);
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

  const fetchBrandCounts = async () => {
    try {
      const counts = await Promise.all(
        carBrands.map(async (brand) => {
          const response = await fetch(
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
          const response = await fetch(
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
          const response = await fetch(
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
      setLicenseCountsByCity(counts);
    } catch (error) {
      setError(
        "An error occurred while fetching license counts by city. Please try again."
      );
    }
  };

  useEffect(() => {
    fetchBrandCounts();
    fetchTransmissionCounts();
    fetchLicenseCountsByCity();
  }, []);

  return (
    <div>
      <h1>Statistics</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h2>Vehicle Counts by Brand</h2>
      <ul>
        {brandCounts.map((item) => (
          <li key={item.brand}>
            {item.brand}: {item.count}
          </li>
        ))}
      </ul>
      <h2>Vehicle Counts by Transmission</h2>
      <ul>
        {transmissionCounts.map((item) => (
          <li key={item.transmission}>
            {item.transmission}: {item.count}
          </li>
        ))}
      </ul>
      <h2>Driver License Counts by City</h2>
      <ul>
        {licenseCountsByCity.map((item) => (
          <li key={item.city}>
            {item.city}: {item.count}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Statistics;
