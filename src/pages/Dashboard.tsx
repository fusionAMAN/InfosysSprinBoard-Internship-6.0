import React from 'react';
import { StatsCards } from '../components/Dashboard/StatsCards';
import { MaintenancePieChart } from '../components/Charts/MaintenancePieChart';
import { VehicleHeatmap } from '../components/Maps/VehicleHeatmap';
import { useFleetData } from '../hooks/useFleetData';
import { Loader2 } from 'lucide-react';

export function Dashboard() {
  const { vehicles, loading, maintenanceStats, vehicleStats } = useFleetData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8" id="dashboard-content">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fleet Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor your fleet operations in real-time</p>
      </div>

      <StatsCards vehicleStats={vehicleStats} totalVehicles={vehicles.length} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <MaintenancePieChart data={maintenanceStats} />
        <VehicleHeatmap vehicles={vehicles} />
      </div>
    </div>
  );
}