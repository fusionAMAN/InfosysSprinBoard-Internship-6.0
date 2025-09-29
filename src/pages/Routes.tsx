import React, { useState } from 'react';
import { Route as RouteIcon, MapPin, Clock, Fuel, Download } from 'lucide-react';
import { useFleetData } from '../hooks/useFleetData';
import { exportToCSV } from '../utils/exportData';

export function Routes() {
  const { routes, loading } = useFleetData();
  const [selectedRoute, setSelectedRoute] = useState(routes[0]);

  const handleOptimize = () => {
    // Simulate route optimization
    alert('Route optimization completed! Estimated savings: 15% fuel, 20% time');
  };

  const handleExportRoutes = () => {
    const routeData = routes.map(route => ({
      id: route.id,
      name: route.name,
      start_location: route.start_location,
      end_location: route.end_location,
      distance: `${route.distance} miles`,
      estimated_time: `${route.estimated_time} hours`,
      fuel_efficiency: `${route.fuel_efficiency} mpg`,
      waypoints: route.waypoints.length,
    }));
    
    const headers = ['ID', 'Name', 'Start Location', 'End Location', 'Distance', 'Estimated Time', 'Fuel Efficiency', 'Waypoints'];
    const rows = routeData.map(route => [
      route.id, route.name, route.start_location, route.end_location,
      route.distance, route.estimated_time, route.fuel_efficiency, route.waypoints
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'routes_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Route Optimization</h1>
          <p className="text-gray-600 mt-2">AI-powered route planning and optimization</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleOptimize}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Optimize All Routes
          </button>
          <button
            onClick={handleExportRoutes}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Routes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Route List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Available Routes</h2>
          </div>
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {routes.map((route) => (
              <div
                key={route.id}
                onClick={() => setSelectedRoute(route)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedRoute?.id === route.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-medium text-gray-900">{route.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {route.start_location} → {route.end_location}
                </p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <span>{route.distance.toFixed(0)} miles</span>
                  <span className="mx-2">•</span>
                  <span>{route.estimated_time.toFixed(1)} hours</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Route Details */}
        <div className="xl:col-span-2 space-y-6">
          {selectedRoute && (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">{selectedRoute.name}</h2>
                  <div className="flex items-center space-x-2">
                    <RouteIcon className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Route Details</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <MapPin className="w-6 h-6 text-blue-600" />
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {selectedRoute.distance.toFixed(0)}
                        </p>
                        <p className="text-sm text-blue-600">Miles</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <Clock className="w-6 h-6 text-green-600" />
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          {selectedRoute.estimated_time.toFixed(1)}
                        </p>
                        <p className="text-sm text-green-600">Hours</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <Fuel className="w-6 h-6 text-yellow-600" />
                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-600">
                          {selectedRoute.fuel_efficiency.toFixed(1)}
                        </p>
                        <p className="text-sm text-yellow-600">MPG</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-md font-medium text-gray-900 mb-3">Route Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      <span className="text-sm text-gray-600">Start: {selectedRoute.start_location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      <span className="text-sm text-gray-600">End: {selectedRoute.end_location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <span className="text-sm text-gray-600">Waypoints: {selectedRoute.waypoints.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optimization Results */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Optimization Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">15%</p>
                    <p className="text-sm text-green-600">Fuel Savings</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">20%</p>
                    <p className="text-sm text-blue-600">Time Savings</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">12%</p>
                    <p className="text-sm text-yellow-600">Distance Reduction</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>AI Recommendations:</strong> Consider avoiding highway congestion between 7-9 AM. 
                    Alternative route through downtown saves 8 minutes and 2.3 miles during peak hours.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}