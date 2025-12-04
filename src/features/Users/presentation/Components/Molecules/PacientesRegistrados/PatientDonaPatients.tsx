import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface AlcoholDistribution {
  category: string;
  count: number;
  probability: number;
  percentage: number;
}

export interface AlcoholStatistics {
  totalRecords: number;
  average: number;
  minimum: number;
  maximum: number;
  positiveCases: number;
  positiveRate: number;
}

export interface AlcoholData {
  statistics: AlcoholStatistics;
  distribution: AlcoholDistribution[];
}

type PatientDonaPatientsProps = {
  data: AlcoholData;
  totalCases: number; 
};

const PatientDonaPatients: React.FC<PatientDonaPatientsProps> = ({ data, totalCases }) => {
  const distribution = data.distribution || [];

  // Memoizar los datos procesados
  const { labels, values } = useMemo(() => ({
    labels: distribution.map((item) => item.category),
    values: distribution.map((item) => item.probability),
  }), [distribution]);

  // Memoizar los datos del gráfico
  const chartData = useMemo(() => ({
    labels,
    datasets: [
      {
        label: "Distribución",
        data: values,
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(251, 146, 60, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 15,
        spacing: 2,
      },
    ],
  }), [labels, values]);

  // Memoizar las opciones del gráfico
  const options: ChartOptions<"doughnut"> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#374151",
          font: { size: 13, weight: 'normal', family: "'Inter', sans-serif" },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels && data.datasets.length) {
              return data.labels.map((label, i) => {
                const value = data.datasets[0].data[i] as number;
                const total = (data.datasets[0].data as number[]).reduce((a, b) => a + b, 0);
                const percent = ((value / total) * 100).toFixed(1);
                return {
                  text: `${label}: ${percent}%`,
                  fillStyle: data.datasets[0].backgroundColor?.[i] as string,
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
          },
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
        borderColor: 'rgba(156, 163, 175, 0.3)',
        borderWidth: 1,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw as number;
            const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
            const percent = ((value / total) * 100).toFixed(1);
            return ` ${label}: ${percent}% (${value} pacientes)`;
          },
        },
      },
    },
  }), []);

  // Memoizar las estadísticas calculadas
  const stats = useMemo(() => {
    const total = values.reduce((a, b) => a + b, 0);
    const maxValue = Math.max(...values);
    const maxCategory = labels[values.indexOf(maxValue)] || "";
    const maxPercent = ((maxValue / total) * 100).toFixed(1);

    return { total, maxValue, maxCategory, maxPercent };
  }, [labels, values]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Resultados de Alcoholemia</h3>
          <p className="text-sm text-gray-500 mt-0.5">Distribución de casos detectados</p>
        </div>
      </div>

      <div className="relative w-full h-[350px] mb-6">
        <Doughnut data={chartData} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-4xl font-bold text-gray-800">{totalCases}</p>
          <p className="text-sm text-gray-500 font-medium">Total pacientes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Total Casos</p>
          <p className="text-2xl font-bold text-blue-900">{totalCases}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <p className="text-xs font-semibold text-green-600 uppercase mb-1">Categoría Mayor</p>
          <p className="text-lg font-bold text-green-900 truncate">{stats.maxCategory}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <p className="text-xs font-semibold text-purple-600 uppercase mb-1">Porcentaje</p>
          <p className="text-2xl font-bold text-purple-900">{stats.maxPercent}%</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PatientDonaPatients);