export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'fleet_manager' | 'driver';
  created_at: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  license_plate: string;
  type: 'truck' | 'van' | 'sedan' | 'suv';
  status: 'active' | 'maintenance' | 'inactive';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  telemetry: VehicleTelemetry;
  maintenance: MaintenanceStatus;
  created_at: string;
  updated_at: string;
}

export interface VehicleTelemetry {
  engine_temp: number;
  tire_pressure: number[];
  fuel_level: number;
  battery_voltage: number;
  mileage: number;
  speed: number;
  last_updated: string;
}

export interface MaintenanceStatus {
  overall: 'healthy' | 'due' | 'critical';
  engine: 'healthy' | 'due' | 'critical';
  tires: 'healthy' | 'due' | 'critical';
  battery: 'healthy' | 'due' | 'critical';
  next_service: string;
  last_service: string;
}

export interface Route {
  id: string;
  name: string;
  start_location: string;
  end_location: string;
  waypoints: Array<{ lat: number; lng: number; address: string }>;
  distance: number;
  estimated_time: number;
  fuel_efficiency: number;
  created_at: string;
}

export interface RouteOptimization {
  original_route: Route;
  optimized_route: Route;
  savings: {
    distance: number;
    time: number;
    fuel: number;
  };
}