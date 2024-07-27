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
import Header from "./components/Header";

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
        <div>
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
              element={
                isAuthenticated ? (
                  <Welcome onLogout={handleLogout} />
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
