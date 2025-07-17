import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import style from "../PacientesRegistrados/patients.module.css";

// Registrar los elementos necesarios para el gráfico de dona
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend);

type AlcoholTestDonutChartProps = {
  positive: number;
  negative: number;
};

const PatientDonaPatients: React.FC<AlcoholTestDonutChartProps> = ({
  positive,
  negative,
}) => {
  const data = {
    labels: ['Positivo', 'Negativo'],
    datasets: [
      {
        label: 'Resultado de alcoholemia',
        data: [positive, negative],
        backgroundColor: ['#66BB6A', '#EF5350'], // rojo y verde
        borderColor: ['#2E7D32', '#C62828'],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#555', // opcional: mejora visibilidad en modo claro/oscuro
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: context => {
            const total = positive + negative;
            const value = context.raw as number;
            const percent = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percent}%)`;
          },
        },
      },

    },
  };

  return (
    <div className="w-auto">
        <div>
        <p className="text-2xl text-[#00000081] mb-4" id={style.titleDona}>
            Distribución de resultados de alcoholemia
        </p>
        </div>
      <div className='h-[36vh] mt-10' id={style.graficaDona}>
      <Doughnut data={data} options={options}/>
      </div>
    </div>
  );
};

export default PatientDonaPatients;
