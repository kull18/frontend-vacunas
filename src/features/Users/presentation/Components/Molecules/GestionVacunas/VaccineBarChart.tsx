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
import style from "./../GestionVacunas/vaccines.module.css"
import zoomPlugin from 'chartjs-plugin-zoom';
import { useRef } from 'react';
import reset from "../../../../../../assets/resetIcon.png"
// Registrar los elementos necesarios para el gráfico de barras
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, zoomPlugin);

type VaccineBarChartProps = {
  labels: string[];       // tipos de vacunas, ej: ['Pfizer', 'Moderna', 'AstraZeneca']
  dataValues: number[];   // cantidades correspondientes
};

const VaccineBarChart: React.FC<VaccineBarChartProps> = ({ labels, dataValues }) => {
  const chartRef = useRef<any>(null);
  const data = {
    labels,
    datasets: [
      {
        label: 'Total de dosis aplicadas',
        data: dataValues,
        backgroundColor: '#1976d299', // azul
        borderColor: '#1976D2',
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
          text: 'Tipo de vacuna',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total de dosis aplicadas',
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
    <div className="" id={style.grafica}>
        <p className="text-xl text-[#00000081] mb-4 sm:text-2xl" id={style.titleBarras}>
            Dosis aplicadas por tipo de vacuna
        </p>
        <div className="relative w-[45vh] h-[40vh] sm:w-[80vh] sm:h-[50vh]" id={style.graficaBarras2}>
            <Bar ref={chartRef} data={data} options={options} />
        </div>
        <button
    className="mt-6 bg-[#1677ff] text-white px-4 py-2 rounded-lg 
    shadow hover:bg-[#4f9dff] duration-200 hover:cursor-pointer flex items-center 
    gap-2 ml-14"
    onClick={handleResetZoom}
    id={style.buttonBar}>
    <img src={reset} alt="" className='w-5 h-5'/>
    Resetear Zoom
  </button>
    </div>

  );
};

export default VaccineBarChart;
