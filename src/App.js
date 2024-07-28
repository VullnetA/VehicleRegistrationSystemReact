import React, { useState, useEffect } from "react";
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
import Header from "./components/Header";
import UserVehicles from "./components/UserVehicles";
import VehicleDetailsReadOnly from "./components/VehicleDetailsReadOnly";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (token) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setRole(localStorage.getItem("role"));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Header onLogout={handleLogout} />}
        {isAuthenticated && role === "Admin" && <Sidebar />}
        <div>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate
                    to={role === "Admin" ? "/welcome" : "/my-vehicles"}
                  />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/welcome"
              element={
                isAuthenticated ? (
                  <Welcome onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/my-vehicles"
              element={
                isAuthenticated ? (
                  <UserVehicles onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/vehicles"
              element={
                isAuthenticated ? (
                  <Vehicle onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/owners"
              element={
                isAuthenticated ? (
                  <Owner onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/add-vehicle"
              element={
                isAuthenticated ? (
                  <AddVehicle onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/add-owner"
              element={
                isAuthenticated ? (
                  <AddOwner onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/vehicle/:id"
              element={
                isAuthenticated ? (
                  <VehicleDetails onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/vehicle-readonly/:id"
              element={
                isAuthenticated ? (
                  <VehicleDetailsReadOnly onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/edit-vehicle/:id"
              element={
                isAuthenticated ? (
                  <EditVehicle onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/owner/:id"
              element={
                isAuthenticated ? (
                  <OwnerDetails onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/edit-owner/:id"
              element={
                isAuthenticated ? (
                  <EditOwner onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/insurance/:id"
              element={
                isAuthenticated ? (
                  <InsuranceDetails onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/statistics"
              element={
                isAuthenticated ? (
                  <Statistics onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
