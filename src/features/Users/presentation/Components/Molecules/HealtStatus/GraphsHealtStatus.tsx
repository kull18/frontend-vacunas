import BarChartHealtStatus from "./BarChartHealtStatus";
import LineChartHealtStatus from "./LineChartHealtStatus";
import style from "../HealtStatus/Healt.module.css";
import { useWebSocket } from "../../../../../../shared/HumidityProvider";

function GraphsHealtStatus() {
  const { temperatureData, humidityData } = useWebSocket();

  const labels = temperatureData?.intervalos || [];
  const marcas = temperatureData?.marcas || [];

  const glucoseData = {
    labels: labels,
    values: marcas,
  };

  const symptomsData = {
    labels: ["Dolor", "Fatiga", "Náuseas"],
    values: [3, 5, 2],
  };

  return (
    <>
      <div className="mt-10">
        <p className="text-2xl text-[#00000081] ml-7" id={style.titleEvolution}>Evolución de mi salud</p>
      </div>
      <div className="flex sm:flex-row flex-wrap">

        <div
          className="w-[50vh] h-[40vh] sm:w-[80vh] sm:h-[40vh]"
          id={style.BarChart}
        >
          <BarChartHealtStatus
            labels={glucoseData.labels}
            dataValues={glucoseData.values}
          />
        </div>
      </div>
    </>
  );
}

export default GraphsHealtStatus;
