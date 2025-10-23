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
import style from "../../Molecules/PacientesRegistrados/patients.module.css";
import styled from "../../Molecules/Transporter/transporter.module.css"

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

type GraphHumidityProps = {
  labels: string[];
  humidity: number[];
};

const GraphHumidity: React.FC<GraphHumidityProps> = ({
  labels,
  humidity,
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Humedad (%)',
        data: humidity,
        backgroundColor: 'rgba(54, 162, 235, 0.3)',
        borderColor: '#36A2EB',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
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
          text: '%',
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
    <div className="w-full h-full" id={style.grafica}>
      <div id={styled.graficaLinea2}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default GraphHumidity;