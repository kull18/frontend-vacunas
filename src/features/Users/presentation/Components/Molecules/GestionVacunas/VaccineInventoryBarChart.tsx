import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Chart,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import reset from "../../../../../../assets/resetIcon.png";
import style from "./../GestionVacunas/vaccines.module.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, zoomPlugin);

type VaccineInventoryBarChartProps = {
  labels: string[];
  dataValues: number[];
};

const VaccineInventoryBarChart: React.FC<VaccineInventoryBarChartProps> = ({
  labels,
  dataValues,
}) => {
  const chartRef = useRef<ChartJS<'bar'>>(null); // Tipo específico del gráfico

  const data = {
    labels,
    datasets: [
      {
        label: 'Dosis disponibles',
        data: dataValues,
        backgroundColor: 'rgba(76, 175, 80, 0.5)',
        borderColor: '#4CAF50',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: 'x',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tipo de vacuna',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Dosis disponibles',
        },
      },
    },
  };

  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  return (
    <div className="" id={style.grafica}>
      <p className="text-xl text-[#00000081] mb-4 sm:text-2xl" id={style.titleBarras2}>
        Dosis disponibles
      </p>

      <div className="relative w-[45vh] h-[40vh] sm:w-[72vh] sm:h-[50vh]" id={style.graficaBarras}>
        <Bar data={data} options={options} ref={chartRef} />
      </div>

      <button
        className="mt-6 bg-[#1677ff] text-white px-4 py-2 rounded-lg 
        shadow hover:bg-[#4f9dff] duration-200 hover:cursor-pointer 
        flex items-center gap-2 ml-14"
        onClick={handleResetZoom}
        id={style.buttonBar2}
      >
        <img src={reset} alt="" className="w-5 h-5" />
        Resetear Zoom
      </button>
    </div>
  );
};

export default VaccineInventoryBarChart;
