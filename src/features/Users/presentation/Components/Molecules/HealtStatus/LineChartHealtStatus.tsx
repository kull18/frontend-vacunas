import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registra los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  labels: string[];
  dataValues: number[];
}

const LineChartHealtStatus: React.FC<LineChartProps> = ({ labels, dataValues }) => {
  const data = {
    labels: labels, // Ejemplo: ["Semana 1", "Semana 2", "Semana 3"]
    datasets: [
      {
        label: "Temperatura",
        data: dataValues, // Ejemplo: [90, 95, 100]
        borderColor: "#4bc0c0",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        fill: true,
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
        text: "Temperatura vs Tiempo",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChartHealtStatus;