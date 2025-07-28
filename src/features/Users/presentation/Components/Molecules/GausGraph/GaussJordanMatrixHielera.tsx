import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { useEffect, useState } from 'react';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function normalPDF(x: number, mean: number, stdDev: number): number {
  const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
  const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
  return coefficient * Math.exp(exponent);
}

interface NormalData {
  media: number;
  desviacion_estandar: number;
  // otros campos si quieres
}

export const NormalDistributionChartHielera = ({ media, desviacion_estandar }: NormalData) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const mean = media;
    const stdDev = desviacion_estandar;

    // Para x, generamos puntos desde (media - 3*stdDev) a (media + 3*stdDev)
    const xValues = [];
    const yValues = [];

    for (let x = mean - 3 * stdDev; x <= mean + 3 * stdDev; x += stdDev / 20) {
      xValues.push(x.toFixed(2));
      yValues.push(normalPDF(x, mean, stdDev));
    }

    setChartData({
      labels: xValues,
      datasets: [
        {
          label: 'Distribución Normal',
          data: yValues,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.3,
          pointRadius: 0,
        },
      ],
    });
  }, [media, desviacion_estandar]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Temperatura (°C)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Densidad de Probabilidad',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  if (!chartData) return <p>Cargando gráfica...</p>;

  return (
    <div style={{ width: '100%', height: '400px', padding: '2rem' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default NormalDistributionChartHielera;
