import React, { useRef } from 'react';
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
import reset from "../../../../../../assets/resetIcon.png"
import style from "../PacientesRegistrados/patients.module.css";

// Registrar los componentes necesarios
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, zoomPlugin);

type VaccinePatientsBarChartProps = {
  labels: string[];       // Ejemplo: ['Pfizer', 'Moderna', 'AstraZeneca']
  dataValues: number[];   // Ejemplo: [250, 180, 100]
};

const PatientBarGraph: React.FC<VaccinePatientsBarChartProps> = ({
  labels,
  dataValues,
}) => {
  const chartRef = useRef<any>(null); // Referencia al gráfico

  const data = {
    labels,
    datasets: [
      {
        label: 'Cantidad de pacientes',
        data: dataValues,
        backgroundColor: '#d2c24e99',
        borderColor: '#b5a74399',
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
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de pacientes',
        },
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
    <div>
  <p className="text-2xl text-[#00000081] mb-4" id={style.titleBarras}>
    Pacientes por tipo de vacuna
  </p>

  <div className="w-[48vh] h-[40vh] sm:w-[80vh] sm:h-[50vh] mx-auto" id={style.graficaBarras}>
    <Bar ref={chartRef} data={data} options={options} />
  </div>

<div className='flex justify-center sm:flex sm:justify-start'>
  <button
    className="mt-6 bg-[#1677FF] text-white px-4 py-2 rounded-lg 
    shadow hover:bg-[#4f9dff] duration-200 hover:cursor-pointer flex items-center gap-2"
    onClick={handleResetZoom}
    id={style.buttonBarras}>
    <img src={reset} alt="" className='w-5 h-5'/>
    Resetear Zoom
  </button>
</div>
</div>

  );
};

export default PatientBarGraph;
