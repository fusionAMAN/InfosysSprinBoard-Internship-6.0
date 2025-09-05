import React, { useState, useEffect } from "react";
import "./../styles/Vehicles.css";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      name: "EV Car 1",
      status: "Available",
      battery: 85,
      fuel: 0,
      location: "Kanpur, UP",
    },
    {
      id: 2,
      name: "Diesel Truck",
      status: "In Use",
      battery: 0,
      fuel: 60,
      location: "Lucknow, UP",
    },
    {
      id: 3,
      name: "EV Bike",
      status: "Needs Service",
      battery: 20,
      fuel: 0,
      location: "Delhi",
    },
  ]);

  // Add new vehicle
  const addVehicle = () => {
    const newVehicle = {
      id: vehicles.length + 1,
      name: `Vehicle ${vehicles.length + 1}`,
      status: "Available",
      battery: Math.floor(Math.random() * 100),
      fuel: Math.floor(Math.random() * 100),
      location: "Random City",
    };
    setVehicles([...vehicles, newVehicle]);
  };

  // Update vehicle status
  const updateStatus = (id, newStatus) => {
    setVehicles(
      vehicles.map((v) =>
        v.id === id ? { ...v, status: newStatus } : v
      )
    );
  };

  // Delete vehicle
  const deleteVehicle = (id) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  // Telemetry simulation (battery/fuel drain + location update)
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles((prevVehicles) =>
        prevVehicles.map((v) => {
          if (v.status === "In Use") {
            return {
              ...v,
              battery: v.battery > 0 ? Math.max(v.battery - 5, 0) : 0,
              fuel: v.fuel > 0 ? Math.max(v.fuel - 5, 0) : 0,
              location: ["Kanpur", "Lucknow", "Delhi", "Agra", "Noida"][
                Math.floor(Math.random() * 5)
              ],
            };
          }
          return v;
        })
      );
    }, 5000); // update every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="vehicles-page">
      <h2>Fleet Inventory & Telemetry</h2>
      <button className="add-btn" onClick={addVehicle}>
        + Add Vehicle
      </button>

      <div className="vehicle-grid">
        {vehicles.map((v) => (
          <div key={v.id} className="vehicle-card">
            <h3>{v.name}</h3>
            <p>📍 {v.location}</p>
            <p>
              Status:{" "}
              <span
                className={`status-chip ${
                  v.status === "Available"
                    ? "green"
                    : v.status === "In Use"
                    ? "blue"
                    : "red"
                }`}
              >
                {v.status}
              </span>
            </p>
            {v.battery > 0 ? (
              <p>
                🔋 Battery:{" "}
                <progress value={v.battery} max="100"></progress> {v.battery}%
              </p>
            ) : (
              <p>
                ⛽ Fuel:{" "}
                <progress value={v.fuel} max="100"></progress> {v.fuel}%
              </p>
            )}

            {/* Action buttons */}
            <div className="btn-group">
              <button onClick={() => updateStatus(v.id, "Available")}>
                Set Available
              </button>
              <button onClick={() => updateStatus(v.id, "In Use")}>
                Set In Use
              </button>
              <button onClick={() => updateStatus(v.id, "Needs Service")}>
                Needs Service
              </button>
              <button className="delete-btn" onClick={() => deleteVehicle(v.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
