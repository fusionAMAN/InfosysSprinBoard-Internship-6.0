function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Overview of vehicles, trips, and statistics.</p>
      <div className="stats">
        <div className="card">🚗 Total Vehicles: 120</div>
        <div className="card">🛣 Active Trips: 45</div>
        <div className="card">⛽ Fuel Efficiency: 87%</div>
      </div>
    </div>
  );
}

export default Dashboard;
