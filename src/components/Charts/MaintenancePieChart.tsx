import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface MaintenancePieChartProps {
  data: {
    healthy: number;
    due: number;
    critical: number;
  };
}

export function MaintenancePieChart({ data }: MaintenancePieChartProps) {
  const chartData = {
    labels: ['Healthy', 'Due', 'Critical'],
    datasets: [
      {
        data: [data.healthy, data.due, data.critical],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderColor: ['#059669', '#d97706', '#dc2626'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return `${context.label}: ${context.raw} (${percentage}%)`;
          },
        },
      },
    },
    cutout: '60%',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Status</h3>
      <div className="relative h-80">
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-1"></div>
          <p className="text-sm text-gray-600">Healthy</p>
          <p className="font-semibold">{data.healthy}</p>
        </div>
        <div>
          <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-1"></div>
          <p className="text-sm text-gray-600">Due</p>
          <p className="font-semibold">{data.due}</p>
        </div>
        <div>
          <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-1"></div>
          <p className="text-sm text-gray-600">Critical</p>
          <p className="font-semibold">{data.critical}</p>
        </div>
      </div>
    </div>
  );
}