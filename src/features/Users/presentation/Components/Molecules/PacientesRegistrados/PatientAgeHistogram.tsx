import React, { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import reset from "../../../../../../assets/resetIcon.png"
import style from "../PacientesRegistrados/patients.module.css";

// Registrar componentes y plugin
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, zoomPlugin);

type AgeGroupData = {
  label: string;
  count: number;
};

interface Props {
  data: AgeGroupData[];
}

const PatientAgeHistogram: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<ChartJS<'bar'>>(null); 

  const chartData = {
    labels: data.map(group => group.label),
    datasets: [
      {
        label: 'Número de pacientes',
        data: data.map(group => group.count),
        backgroundColor: '#16c1ff',
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Distribución de pacientes por rango de edad',
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x' as const,
        },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: 'x' as const,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Rango de edad',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Cantidad de pacientes',
        },
        beginAtZero: true,
      },
    },
  };

  const handleResetZoom = () => {
    const chart = chartRef.current;
    if (chart && chart.resetZoom) {
      chart.resetZoom();
    }
  };

  return (
  <div className="px-4 sm:px-8"> {/* Añade padding horizontal */}
    <p className="text-2xl text-[#00000081] mb-4" id={style.titleHistograma}>
      Distribución de pacientes por rango de edad
    </p>

    <div className="w-full h-[400px] sm:h-[500px] sm:pr-4"
    id={style.graficaHistograma}> {/* Añade padding-right solo en escritorio */}
      <Bar 
        ref={chartRef} 
        data={chartData} 
        options={options} 
        style={{ width: '100%', height: '100%' }}
      />
    </div>

    <div className='flex justify-center sm:flex sm:justify-start sm:pr-4'> {/* Añade padding-right al botón también */}
      <button
        className="mt-6 bg-[#1677ff] text-white px-4 py-2 rounded-lg 
        shadow hover:bg-[#4f9dff] duration-200 hover:cursor-pointer flex items-center gap-2"
        onClick={handleResetZoom}
        id={style.buttonHistograma}
      >
        <img src={reset} alt="" className='w-5 h-5'/>
        Resetear Zoom
      </button>
    </div>
  </div>
);
};

export default PatientAgeHistogram;
