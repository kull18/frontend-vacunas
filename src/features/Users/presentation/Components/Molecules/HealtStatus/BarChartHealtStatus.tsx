import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registra los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  labels: string[];
  dataValues: number[];
}

const BarChartHealtStatus: React.FC<BarChartProps> = ({ labels, dataValues }) => {
  const data = {
    labels: labels, // Ejemplo: ["Dolor", "Fatiga", "Náuseas"]
    datasets: [
      {
        label: "Intensidad (1-10)",
        data: dataValues, // Ejemplo: [3, 5, 2]
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Síntomas Reportados",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChartHealtStatus;