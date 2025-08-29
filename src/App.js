import React from "react";

export default function App() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      
      {/* Sidebar */}
      <div style={{ width: "220px", background: "#1e293b", color: "#fff", padding: "20px" }}>
        <h2 style={{ marginBottom: "30px" }}>🚦 NeuroFleetX</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "15px", cursor: "pointer" }}>Dashboard</li>
          <li style={{ marginBottom: "15px", cursor: "pointer" }}>Traffic Analytics</li>
          <li style={{ marginBottom: "15px", cursor: "pointer" }}>Fleet Management</li>
          <li style={{ marginBottom: "15px", cursor: "pointer" }}>Reports</li>
          <li style={{ marginBottom: "15px", cursor: "pointer" }}>Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: "#f1f5f9", padding: "20px" }}>
        
        {/* Header */}
        <div style={{ background: "#fff", padding: "15px 20px", borderRadius: "8px", marginBottom: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <h1 style={{ margin: 0 }}>Urban Mobility Dashboard</h1>
        </div>

        {/* Dashboard Sections */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <h2>Traffic Overview</h2>
            <p>Placeholder for traffic congestion data / charts.</p>
          </div>
          
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <h2>Fleet Optimization</h2>
            <p>Placeholder for fleet routes & AI optimization.</p>
          </div>
          
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <h2>Reports</h2>
            <p>Placeholder for performance metrics.</p>
          </div>
          
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <h2>Live Updates</h2>
            <p>Placeholder for real-time alerts & notifications.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
