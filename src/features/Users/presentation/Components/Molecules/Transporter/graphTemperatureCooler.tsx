import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import style from "../../Molecules/PacientesRegistrados/patients.module.css";
import styled from "../../Molecules/Transporter/transporter.module.css"
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  zoomPlugin
);

type GraphTemperatureProps = {
  labels: string[];
  temperatures: number[];
};

const GraphTemperatureCooler: React.FC<GraphTemperatureProps> = ({
  labels,
  temperatures,
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: temperatures,
        backgroundColor: 'rgba(75,192,192,0.3)',
        borderColor: '#1677FF',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
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
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '°C',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Días',
        },
      },
    },
  };

  return (
    <div className="w-full sm:w-[100vh]" id={style.grafica}>
      <div className="mt-7 ml-10">
        <p className="text-2xl text-[#00000081]" id={style.title2}>
          Temperatura de hielera
        </p>
      </div>
      <div id={styled.graficaLinea}>
      <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default GraphTemperatureCooler;
