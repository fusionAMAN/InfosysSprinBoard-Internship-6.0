import { useState, useEffect } from 'react';
import { Vehicle, Route, RouteOptimization } from '../types';

// Mock data generators
const generateVehicles = (): Vehicle[] => {
  const makes = ['Ford', 'Chevrolet', 'Toyota', 'Mercedes', 'Volvo'];
  const models = ['Transit', 'Express', 'Prius', 'Sprinter', 'VNL'];
  const types = ['truck', 'van', 'sedan', 'suv'] as const;
  const statuses = ['healthy', 'due', 'critical'] as const;
  
  return Array.from({ length: 25 }, (_, i) => ({
    id: `vehicle-${i + 1}`,
    make: makes[Math.floor(Math.random() * makes.length)],
    model: models[Math.floor(Math.random() * models.length)],
    year: 2018 + Math.floor(Math.random() * 6),
    vin: `1HGBH41JXMN${String(Math.random()).slice(2, 8)}`,
    license_plate: `ABC-${String(Math.random()).slice(2, 5)}`,
    type: types[Math.floor(Math.random() * types.length)],
    status: Math.random() > 0.8 ? 'maintenance' : 'active',
    location: {
      lat: 40.7128 + (Math.random() - 0.5) * 0.2,
      lng: -74.0060 + (Math.random() - 0.5) * 0.2,
      address: `${Math.floor(Math.random() * 999)} Main St, New York, NY`,
    },
    telemetry: {
      engine_temp: 180 + Math.random() * 40,
      tire_pressure: [32, 33, 31, 32].map(p => p + (Math.random() - 0.5) * 4),
      fuel_level: Math.random() * 100,
      battery_voltage: 12 + Math.random() * 2,
      mileage: 50000 + Math.random() * 100000,
      speed: Math.random() * 70,
      last_updated: new Date().toISOString(),
    },
    maintenance: {
      overall: statuses[Math.floor(Math.random() * statuses.length)],
      engine: statuses[Math.floor(Math.random() * statuses.length)],
      tires: statuses[Math.floor(Math.random() * statuses.length)],
      battery: statuses[Math.floor(Math.random() * statuses.length)],
      next_service: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      last_service: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
};

const generateRoutes = (): Route[] => {
  const cities = [
    'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX',
    'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA'
  ];
  
  return Array.from({ length: 15 }, (_, i) => ({
    id: `route-${i + 1}`,
    name: `Route ${i + 1}`,
    start_location: cities[Math.floor(Math.random() * cities.length)],
    end_location: cities[Math.floor(Math.random() * cities.length)],
    waypoints: Array.from({ length: Math.floor(Math.random() * 5) }, () => ({
      lat: 40.7128 + (Math.random() - 0.5) * 10,
      lng: -74.0060 + (Math.random() - 0.5) * 20,
      address: `${Math.floor(Math.random() * 999)} Street, City, State`,
    })),
    distance: 100 + Math.random() * 500,
    estimated_time: 2 + Math.random() * 8,
    fuel_efficiency: 6 + Math.random() * 4,
    created_at: new Date().toISOString(),
  }));
};

export function useFleetData() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setVehicles(generateVehicles());
      setRoutes(generateRoutes());
      setLoading(false);
    }, 1500);
  }, []);

  const getMaintenanceStats = () => {
    const stats = vehicles.reduce(
      (acc, vehicle) => {
        acc[vehicle.maintenance.overall]++;
        return acc;
      },
      { healthy: 0, due: 0, critical: 0 }
    );
    return stats;
  };

  const getVehiclesByStatus = () => {
    return vehicles.reduce(
      (acc, vehicle) => {
        acc[vehicle.status]++;
        return acc;
      },
      { active: 0, maintenance: 0, inactive: 0 }
    );
  };

  return {
    vehicles,
    routes,
    loading,
    maintenanceStats: getMaintenanceStats(),
    vehicleStats: getVehiclesByStatus(),
  };
}