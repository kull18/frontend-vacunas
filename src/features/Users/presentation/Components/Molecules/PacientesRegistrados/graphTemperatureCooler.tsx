// src/components/GraphTemperature.tsx
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import style from "../../Molecules/PacientesRegistrados/patients.module.css"
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
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
    <>  
    <div className="w-full sm:w-[88vh]" id={style.grafica}>
        <div className="mt-7 ml-10">
            <p className="text-2xl text-[#00000081]" id={style.title2}>Temperatura de hielera</p>
        </div>
        <Line data={data} options={options} />
    </div>
    </>
  );
};

export default GraphTemperatureCooler;
