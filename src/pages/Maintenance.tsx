import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Wrench } from 'lucide-react';
import { useFleetData } from '../hooks/useFleetData';
import { Vehicle } from '../types';
import { format } from 'date-fns';

export function Maintenance() {
  const { vehicles, loading, maintenanceStats } = useFleetData();
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'healthy' | 'due' | 'critical'>('all');

  const filteredVehicles = vehicles.filter(vehicle => 
    selectedStatus === 'all' || vehicle.maintenance.overall === selectedStatus
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'due': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default: return <Wrench className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-50 border-green-200';
      case 'due': return 'bg-yellow-50 border-yellow-200';
      case 'critical': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Maintenance Dashboard</h1>
        <p className="text-gray-600 mt-2">Predictive maintenance and vehicle health monitoring</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{vehicles.length}</p>
            </div>
            <Wrench className="w-6 h-6 text-gray-500" />
          </div>
        </div>

        <div className="bg-green-50 rounded-xl border border-green-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Healthy</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{maintenanceStats.healthy}</p>
            </div>
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Service Due</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{maintenanceStats.due}</p>
            </div>
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
        </div>

        <div className="bg-red-50 rounded-xl border border-red-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Critical</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{maintenanceStats.critical}</p>
            </div>
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center space-x-4">
        {(['all', 'critical', 'due', 'healthy'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
              selectedStatus === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status === 'all' ? 'All Vehicles' : `${status} (${maintenanceStats[status] || 0})`}
          </button>
        ))}
      </div>

      {/* Vehicle List */}
      <div className="space-y-4">
        {filteredVehicles.map((vehicle: Vehicle) => (
          <div
            key={vehicle.id}
            className={`rounded-xl border-2 p-6 ${getStatusColor(vehicle.maintenance.overall)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                {getStatusIcon(vehicle.maintenance.overall)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {vehicle.make} {vehicle.model} ({vehicle.year})
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{vehicle.license_plate}</p>
                  <p className="text-sm text-gray-600">{vehicle.telemetry.mileage.toLocaleString()} miles</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`text-sm font-medium capitalize ${
                  vehicle.maintenance.overall === 'healthy' ? 'text-green-600' :
                  vehicle.maintenance.overall === 'due' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {vehicle.maintenance.overall}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Next service: {format(new Date(vehicle.maintenance.next_service), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Engine</p>
                <div className="flex items-center justify-center mt-1">
                  {getStatusIcon(vehicle.maintenance.engine)}
                  <span className={`ml-1 text-sm font-medium capitalize ${
                    vehicle.maintenance.engine === 'healthy' ? 'text-green-600' :
                    vehicle.maintenance.engine === 'due' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {vehicle.maintenance.engine}
                  </span>
                </div>
              </div>

              <div className="text-center p-3 bg-white/50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Tires</p>
                <div className="flex items-center justify-center mt-1">
                  {getStatusIcon(vehicle.maintenance.tires)}
                  <span className={`ml-1 text-sm font-medium capitalize ${
                    vehicle.maintenance.tires === 'healthy' ? 'text-green-600' :
                    vehicle.maintenance.tires === 'due' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {vehicle.maintenance.tires}
                  </span>
                </div>
              </div>

              <div className="text-center p-3 bg-white/50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Battery</p>
                <div className="flex items-center justify-center mt-1">
                  {getStatusIcon(vehicle.maintenance.battery)}
                  <span className={`ml-1 text-sm font-medium capitalize ${
                    vehicle.maintenance.battery === 'healthy' ? 'text-green-600' :
                    vehicle.maintenance.battery === 'due' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {vehicle.maintenance.battery}
                  </span>
                </div>
              </div>

              <div className="text-center p-3 bg-white/50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Last Service</p>
                <p className="text-sm font-medium text-gray-700 mt-1">
                  {format(new Date(vehicle.maintenance.last_service), 'MMM dd')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No vehicles found with the selected status.</p>
        </div>
      )}
    </div>
  );
}