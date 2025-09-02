function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Total Vehicles</h3>
          <p className="text-3xl font-bold">120</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Active Trips</h3>
          <p className="text-3xl font-bold">15</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Reports Generated</h3>
          <p className="text-3xl font-bold">42</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
