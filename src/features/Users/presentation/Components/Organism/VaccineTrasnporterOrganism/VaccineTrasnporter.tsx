import { useHumidity } from "../../../../../../shared/HumidityProvider";
import { useTemperature } from "../../../../../../shared/TemperatureProvider";
import NormalDistributionChart from "../../Molecules/GausGraph/GaussJordanMatrixChart";
import NormalDistributionChartHielera from "../../Molecules/GausGraph/GaussJordanMatrixHielera";
import GraphHumidity from "../../Molecules/Transporter/GraphHumidity";
import GraphTemperatureCooler from "../../Molecules/Transporter/graphTemperatureCooler";
import InventoryCards from "../../Molecules/Transporter/InventoryCards";
import style from "../VaccineTrasnporterOrganism/transporter.module.css"
import { HumidityProvider } from "../../../../../../shared/HumidityProvider";
import { TemperatureProvider } from "../../../../../../shared/TemperatureProvider";
import { useGetStatistics } from "../../../../User/Presentation/Hooks/useGetStatistics";

function VaccineTrasnporter() {
  const temperatureData = useTemperature();
  const humidityData = useHumidity();
  const { data: stats } = useGetStatistics(); // Renombramos 'data' a 'stats'

  const labels = temperatureData?.intervalos || [];
  const marcas = temperatureData?.marcas || [];

  const labelsH = humidityData?.intervalos || [];
  const valuesH = humidityData?.marcas || [];

  return (
    <>
      <div className="flex-none mt-3 sm:flex sm:flex-col">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col gap-6" id={style.cards}>
            <InventoryCards />
          </div>

          <div className="w-full sm:w-auto">
            <GraphTemperatureCooler labels={labels} temperatures={marcas} />
          </div>
        </div>

        <div className="flex mt-5">
          <GraphHumidity labels={labelsH} humidity={valuesH} />
        </div>

        <div>
          {stats ? (
            <NormalDistributionChartHielera
              media={stats.mean}
              desviacion_estandar={stats.standarDeviation}
            />
          ) : (
            <p>Cargando datos de distribución...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default VaccineTrasnporter;