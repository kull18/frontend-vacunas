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
  const { data: stats } = useGetStatistics();

  const labels = temperatureData?.intervalos || [];
  const marcas = temperatureData?.marcas || [];

  const labelsH = humidityData?.intervalos || [];
  const valuesH = humidityData?.marcas || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Monitoreo de Transportadora
        </h1>
        <p className="text-gray-500 mt-1">
          Control de temperatura y humedad en tiempo real
        </p>
      </div>

      {/* Grid de Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfica de Temperatura */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Temperatura de Hielera
            </h2>
          </div>
          <GraphTemperatureCooler labels={labels} temperatures={marcas} />
        </div>

        {/* Gráfica de Humedad */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Humedad de Hielera
            </h2>
          </div>
          <GraphHumidity labels={labelsH} humidity={valuesH} />
        </div>
      </div>

      {/* Gráfica de Distribución Normal - Ancho Completo */}
      <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">
              Distribución Normal de Temperatura
            </h2>
            {stats && (
              <p className="text-sm text-gray-500 mt-1">
                Media: <span className="font-semibold text-gray-700">{stats.mean.toFixed(2)}°C</span> | 
                Desviación estándar: <span className="font-semibold text-gray-700">{stats.standarDeviation.toFixed(2)}</span>
              </p>
            )}
          </div>
        </div>
        
        {stats ? (
          <div className="mt-4">
            <NormalDistributionChartHielera
              media={stats.mean}
              desviacion_estandar={stats.standarDeviation}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 font-medium">Cargando datos de distribución...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VaccineTrasnporter;