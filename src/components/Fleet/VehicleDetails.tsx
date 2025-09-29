import React from 'react';
import { X, MapPin, Fuel, Battery, Gauge, Thermometer } from 'lucide-react';
import { Vehicle } from '../../types';
import { format } from 'date-fns';
import { clsx } from 'clsx';

interface VehicleDetailsProps {
  vehicle: Vehicle;
  onClose: () => void;
}

export function VehicleDetails({ vehicle, onClose }: VehicleDetailsProps) {
  const getMaintenanceColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50';
      case 'due': return 'text-yellow-600 bg-yellow-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {vehicle.make} {vehicle.model} ({vehicle.year})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">VIN:</span>
                    <span className="font-medium">{vehicle.vin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">License Plate:</span>
                    <span className="font-medium">{vehicle.license_plate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium capitalize">{vehicle.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mileage:</span>
                    <span className="font-medium">{vehicle.telemetry.mileage.toLocaleString()} miles</span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Location</h3>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-gray-900">{vehicle.location.address}</p>
                    <p className="text-sm text-gray-500">
                      {vehicle.location.lat.toFixed(6)}, {vehicle.location.lng.toFixed(6)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Telemetry Data */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-time Telemetry</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <Fuel className="w-8 h-8 text-blue-500" />
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {vehicle.telemetry.fuel_level.toFixed(0)}%
                        </p>
                        <p className="text-sm text-blue-600">Fuel Level</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <Battery className="w-8 h-8 text-green-500" />
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          {vehicle.telemetry.battery_voltage.toFixed(1)}V
                        </p>
                        <p className="text-sm text-green-600">Battery</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <Gauge className="w-8 h-8 text-purple-500" />
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600">
                          {vehicle.telemetry.speed.toFixed(0)}
                        </p>
                        <p className="text-sm text-purple-600">Speed (mph)</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <Thermometer className="w-8 h-8 text-orange-500" />
                      <div className="text-right">
                        <p className="text-2xl font-bold text-orange-600">
                          {vehicle.telemetry.engine_temp.toFixed(0)}°F
                        </p>
                        <p className="text-sm text-orange-600">Engine Temp</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-md font-medium text-gray-900 mb-2">Tire Pressure</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {vehicle.telemetry.tire_pressure.map((pressure, index) => (
                      <div key={index} className="text-center p-2 bg-gray-50 rounded">
                        <p className="text-sm font-medium">{pressure.toFixed(1)} PSI</p>
                        <p className="text-xs text-gray-500">Tire {index + 1}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance Status */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.entries(vehicle.maintenance).map(([key, value]) => {
                if (key === 'next_service' || key === 'last_service') return null;
                
                return (
                  <div key={key} className={clsx(
                    'p-4 rounded-lg border-2',
                    getMaintenanceColor(value as string)
                  )}>
                    <p className="font-medium capitalize">{key.replace('_', ' ')}</p>
                    <p className="text-sm capitalize">{value as string}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Last Service</p>
                <p className="font-medium">{format(new Date(vehicle.maintenance.last_service), 'MMM dd, yyyy')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Next Service</p>
                <p className="font-medium">{format(new Date(vehicle.maintenance.next_service), 'MMM dd, yyyy')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}