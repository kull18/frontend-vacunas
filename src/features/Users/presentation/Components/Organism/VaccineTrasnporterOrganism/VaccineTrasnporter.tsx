//VaccineTrasnporter.tsx
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
import { useEffect, useState } from "react";
function VaccineTrasnporter() {
  const temperatureData = useTemperature();
  const humidityData = useHumidity();
  const { data: stats } = useGetStatistics();


  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [swReady, setSwReady] = useState(false);


  const labels = temperatureData?.intervalos || [];
  const marcas = temperatureData?.marcas || [];

  const labelsH = humidityData?.intervalos || [];
  const valuesH = humidityData?.marcas || [];

  useEffect(() => {
    registerServiceWorker();
    setupConnectionListeners();
  }, []);

  //service worker
 const registerServiceWorker = async () => {
    if (!("serviceWorker" in navigator)) {
      console.warn("⚠️ Service Workers no soportados");
      return;
    }

    try {
      console.log("[App] 🚀 Registrando Service Worker...");
      
      // ✅ CORREGIDO: Path desde raíz
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });

      if (registration.installing) {
        console.log("[SW] ⏳ Service worker instalando...");
      } else if (registration.waiting) {
        console.log("[SW] ⏸️ Service worker esperando...");
      } else if (registration.active) {
        console.log("[SW] ✅ Service worker activo");
        setSwReady(true);
      }

      // Manejar actualizaciones
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        console.log("[SW] 🔄 Nueva versión disponible");

        newWorker?.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            const shouldUpdate = confirm(
              "🔄 Nueva versión disponible!\n\n¿Deseas actualizar ahora?"
            );
            if (shouldUpdate) {
              newWorker.postMessage({ type: "SKIP_WAITING" });
              window.location.reload();
            }
          }
        });
      });

      console.log("[App] ✅ Service Worker registrado");
    } catch (error) {
      console.error("[App] ❌ Error registrando Service Worker:", error);
    }
  };

  const setupConnectionListeners = () => {
    window.addEventListener("online", () => {
      console.log("[App] 🌐 Conexión restaurada");
      setIsOnline(true);
    });

    window.addEventListener("offline", () => {
      console.log("[App] 📵 Sin conexión");
      setIsOnline(false);
    });

    setIsOnline(navigator.onLine);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">

        {!isOnline && (
        <div className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-pulse">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" />
          </svg>
          <div>
            <p className="font-bold text-lg">📵 Sin conexión a Internet</p>
            <p className="text-sm opacity-90">
              Mostrando datos guardados en caché. Se sincronizarán cuando vuelva la conexión.
            </p>
          </div>
        </div>
      )}


      {swReady && isOnline && (
        <div className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <p className="font-bold">✅ Modo offline habilitado</p>
            <p className="text-sm opacity-90">
              La aplicación funcionará sin conexión a internet
            </p>
          </div>
          <button
            onClick={() => setSwReady(false)}
            className="text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      )}


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