import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import style from "../PacientesRegistrados/patients.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

type AlcoholData = {
  category: string;
  probability: number;
};

type PatientDonaPatientsProps = {
  data: AlcoholData[];
};

const PatientDonaPatients: React.FC<PatientDonaPatientsProps> = ({ data }) => {
  const labels = data.map((item) => item.category);
  const values = data.map((item) => item.probability);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Probabilidad de resultado",
        data: values,
        backgroundColor: [
          "#66BB6A",
          "#EF5350",
          "#FFA726",
          "#29B6F6",
          "#AB47BC",
          "#FF7043",
        ],
        borderColor: [
          "#2E7D32",
          "#C62828",
          "#FB8C00",
          "#0288D1",
          "#6A1B9A",
          "#D84315",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#555",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw as number;
            const percent = (value * 100).toFixed(1);
            return `${label}: ${percent}%`;
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
      <div className="h-[36vh] mt-10" id={style.graficaDona}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PatientDonaPatients;
