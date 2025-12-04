import React, { useRef, useMemo } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, zoomPlugin);

type VaccinePatientsBarChartProps = {
  labels: string[];
  dataValues: number[]
};

const PatientBarGraph: React.FC<VaccinePatientsBarChartProps> = ({
  labels,
  dataValues,
}) => {
  const chartRef = useRef<any>(null);

  // Memoizar los datos del gráfico para evitar recalculos innecesarios
  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        label: 'Cantidad de pacientes',
        data: dataValues,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: 'rgba(59, 130, 246, 0.9)',
        hoverBorderColor: 'rgba(37, 99, 235, 1)',
      },
    ],
  }), [labels, dataValues]);

  // Memoizar las opciones del gráfico
  const options: ChartOptions<'bar'> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 13,
            weight: 'normal',
            family: "'Inter', sans-serif",
          },
          color: '#374151',
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: (context) => {
            return ` ${context.dataset.label}: ${context.parsed.y} pacientes`;
          },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tipo de vacuna',
          color: '#6B7280',
          font: {
            size: 13,
            weight: 'normal',
            family: "'Inter', sans-serif",
          },
          padding: { top: 10 },
        },
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de pacientes',
          color: '#6B7280',
          font: {
            size: 13,
            weight: 'normal',
            family: "'Inter', sans-serif",
          },
          padding: { bottom: 10 },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
          padding: 8,
        },
      },
    },
  }), []);

  const handleResetZoom = () => {
    const chart = chartRef.current;
    if (chart && chart.resetZoom) {
      chart.resetZoom();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Pacientes por tipo de vacuna</h3>
          <p className="text-sm text-gray-500 mt-0.5">Distribución de vacunas aplicadas</p>
        </div>
      </div>

      <div className="w-full h-[400px] mb-4">
        <Bar ref={chartRef} data={data} options={options} />
      </div>

      <div className="flex justify-center pt-4 border-t border-gray-100">
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          onClick={handleResetZoom}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Resetear Zoom
        </button>
      </div>
    </div>
  );
};

export default React.memo(PatientBarGraph);