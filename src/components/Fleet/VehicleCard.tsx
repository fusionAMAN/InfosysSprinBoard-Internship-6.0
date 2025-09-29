import React from 'react';
import { MapPin, Fuel, Battery, Gauge } from 'lucide-react';
import { Vehicle } from '../../types';
import { format } from 'date-fns';
import { clsx } from 'clsx';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onSelect }: VehicleCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMaintenanceColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'due': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onSelect(vehicle)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-sm text-gray-600">{vehicle.license_plate}</p>
        </div>
        <span className={clsx(
          'px-3 py-1 rounded-full text-sm font-medium capitalize',
          getStatusColor(vehicle.status)
        )}>
          {vehicle.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="truncate">{vehicle.location.address}</span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center">
            <Fuel className="w-4 h-4 mr-1 text-blue-500" />
            <span className="text-xs text-gray-600">
              {vehicle.telemetry.fuel_level.toFixed(0)}%
            </span>
          </div>
          <div className="flex items-center">
            <Battery className="w-4 h-4 mr-1 text-green-500" />
            <span className="text-xs text-gray-600">
              {vehicle.telemetry.battery_voltage.toFixed(1)}V
            </span>
          </div>
          <div className="flex items-center">
            <Gauge className="w-4 h-4 mr-1 text-purple-500" />
            <span className="text-xs text-gray-600">
              {vehicle.telemetry.speed.toFixed(0)} mph
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Maintenance Status</span>
            <span className={clsx(
              'text-xs font-medium capitalize',
              getMaintenanceColor(vehicle.maintenance.overall)
            )}>
              {vehicle.maintenance.overall}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Next service: {format(new Date(vehicle.maintenance.next_service), 'MMM dd, yyyy')}
          </div>
        </div>
      </div>
    </div>
  );
}