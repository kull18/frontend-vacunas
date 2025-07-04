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
  humidity: string[]; 
};

const GraphHumidity: React.FC<GraphHumidityProps> = ({
  labels,
  humidity,
}) => {
  const parsedHumidity = humidity.map((h) => parseFloat(h));

  const data = {
    labels,
    datasets: [
      {
        label: 'Humedad (%)',
        data: parsedHumidity,
        backgroundColor: 'rgba(54, 162, 235, 0.3)',
        borderColor: '#36A2EB',
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
    <>
      <div className="w-full sm:w-[145vh]" id={style.grafica}>
        <div className="ml-10">
          <p className="text-2xl text-[#00000081]" id={style.title2}>
            Humedad de hielera
          </p>
        </div>
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default GraphHumidity;
