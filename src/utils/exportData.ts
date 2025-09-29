import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Vehicle } from '../types';

export const exportToCSV = (vehicles: Vehicle[], filename: string = 'fleet_data.csv') => {
  const headers = [
    'ID', 'Make', 'Model', 'Year', 'VIN', 'License Plate', 'Type', 'Status',
    'Location', 'Fuel Level', 'Battery Voltage', 'Speed', 'Mileage',
    'Maintenance Status', 'Engine Status', 'Tire Status', 'Battery Status'
  ];

  const rows = vehicles.map(vehicle => [
    vehicle.id,
    vehicle.make,
    vehicle.model,
    vehicle.year,
    vehicle.vin,
    vehicle.license_plate,
    vehicle.type,
    vehicle.status,
    vehicle.location.address,
    `${vehicle.telemetry.fuel_level.toFixed(1)}%`,
    `${vehicle.telemetry.battery_voltage.toFixed(1)}V`,
    `${vehicle.telemetry.speed.toFixed(1)} mph`,
    vehicle.telemetry.mileage.toLocaleString(),
    vehicle.maintenance.overall,
    vehicle.maintenance.engine,
    vehicle.maintenance.tires,
    vehicle.maintenance.battery,
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportToPDF = async (elementId: string, filename: string = 'fleet_report.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};