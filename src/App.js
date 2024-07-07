import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Vehicle from "./components/Vehicle";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import AddVehicle from "./components/AddVehicle";
import VehicleDetails from "./components/VehicleDetails";
import EditVehicle from "./components/EditVehicle";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import Statistics from "./components/Statistics";
import Owner from "./components/Owner";
import OwnerDetails from "./components/OwnerDetails";
import EditOwner from "./components/EditOwner";
import AddOwner from "./components/AddOwner";
import InsuranceDetails from "./components/InsuranceDetails";
import Header from "./components/Header"; // Import Header component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Header onLogout={handleLogout} />}
        {isAuthenticated && <Sidebar />}
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/welcome" />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/welcome"
              element={isAuthenticated ? <Welcome /> : <Navigate to="/login" />}
            />
            <Route
              path="/vehicles"
              element={isAuthenticated ? <Vehicle /> : <Navigate to="/login" />}
            />
            <Route
              path="/owners"
              element={isAuthenticated ? <Owner /> : <Navigate to="/login" />}
            />
            <Route
              path="/add-vehicle"
              element={
                isAuthenticated ? <AddVehicle /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/add-owner"
              element={
                isAuthenticated ? <AddOwner /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/vehicle/:id"
              element={
                isAuthenticated ? <VehicleDetails /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/edit-vehicle/:id"
              element={
                isAuthenticated ? <EditVehicle /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/owner/:id"
              element={
                isAuthenticated ? <OwnerDetails /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/edit-owner/:id"
              element={
                isAuthenticated ? <EditOwner /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/insurance/:id"
              element={
                isAuthenticated ? (
                  <InsuranceDetails />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/statistics"
              element={
                isAuthenticated ? <Statistics /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
