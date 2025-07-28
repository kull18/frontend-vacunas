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
}

export const NormalDistributionChartEmpty = ({ media, desviacion_estandar }: NormalData) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const xValues: string[] = [];
    const yValues: number[] = [];

    if (
      typeof media !== "number" ||
      isNaN(media) ||
      typeof desviacion_estandar !== "number" ||
      isNaN(desviacion_estandar) ||
      desviacion_estandar <= 0
    ) {
      // Gráfica vacía con etiquetas pero sin datos
      for (let i = 0; i <= 10; i++) {
        xValues.push(i.toString());
        yValues.push(0);
      }
      setChartData({
        labels: xValues,
        datasets: [
          {
            label: 'No hay datos válidos',
            data: yValues,
            borderColor: 'rgba(200, 200, 200, 0.5)',
            borderWidth: 1,
            fill: false,
            pointRadius: 0,
            borderDash: [5, 5],
          },
        ],
      });
      return;
    }

    // Caso normal: graficar distribución normal
    const mean = media;
    const stdDev = desviacion_estandar;

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

  if (!chartData) return <p>Cargando gráfica...</p>;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Valores',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Densidad',
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

  return (
    <div style={{ width: '100%', height: '400px', padding: '2rem' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default NormalDistributionChartEmpty;
