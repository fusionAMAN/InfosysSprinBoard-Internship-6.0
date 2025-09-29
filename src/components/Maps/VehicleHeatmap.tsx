import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Vehicle } from '../../types';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface VehicleHeatmapProps {
  vehicles: Vehicle[];
}

export function VehicleHeatmap({ vehicles }: VehicleHeatmapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || vehicles.length === 0) return;

    // Initialize map
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([40.7128, -74.0060], 10);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapInstance.current);
    }

    const map = mapInstance.current;
    
    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add markers for each vehicle
    vehicles.forEach((vehicle) => {
      const color = vehicle.status === 'active' ? 'green' : 
                   vehicle.status === 'maintenance' ? 'orange' : 'red';
      
      const marker = L.circleMarker([vehicle.location.lat, vehicle.location.lng], {
        radius: 8,
        fillColor: color,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      });

      marker.bindPopup(`
        <div>
          <strong>${vehicle.make} ${vehicle.model}</strong><br>
          ${vehicle.license_plate}<br>
          Status: ${vehicle.status}<br>
          Speed: ${vehicle.telemetry.speed.toFixed(0)} mph<br>
          Fuel: ${vehicle.telemetry.fuel_level.toFixed(0)}%
        </div>
      `);

      marker.addTo(map);
    });

    // Fit bounds to show all vehicles
    if (vehicles.length > 0) {
      const group = new L.featureGroup(
        vehicles.map(v => L.marker([v.location.lat, v.location.lng]))
      );
      map.fitBounds(group.getBounds().pad(0.1));
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [vehicles]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Locations</h3>
      <div ref={mapRef} className="w-full h-96 rounded-lg" />
      <div className="mt-4 flex items-center space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
          <span>Active ({vehicles.filter(v => v.status === 'active').length})</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
          <span>Maintenance ({vehicles.filter(v => v.status === 'maintenance').length})</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <span>Inactive ({vehicles.filter(v => v.status === 'inactive').length})</span>
        </div>
      </div>
    </div>
  );
}