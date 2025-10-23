import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import type { ChartOptions } from "chart.js";
import { useGetGaussCurve } from "../../../../User/Presentation/Hooks/useGetGaussCurve";
import { useCreatePointGauss } from "../../../../User/Presentation/Hooks/useCreatePointGauss";
import { useAuth } from "../../../../User/Presentation/Hooks/AuthProvider";

Chart.register(...registerables);

interface GaussPoint {
  x: number;
  y: number;
}

interface GraphData {
  mean: number;
  standarDeviation: number;
  median: number;
  mode: number;
  range: number;
  variance: number;
  points: GaussPoint[];
  inputPoint?: GaussPoint;
}

export default function GaussianChart() {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [valueToHighlight, setValueToHighlight] = useState<number | null>(null);

  const { token } = useAuth();
  const { data } = useGetGaussCurve();
  const { createPoint } = useCreatePointGauss();

  useEffect(() => {
    if (data) {
      setGraphData(data);
    }
  }, [data]);

  const handleHighlight = async () => {
    if (valueToHighlight === null || !token) return;

    try {
      const result = await createPoint(token, valueToHighlight);
      setGraphData(result);
    } catch (error) {
      console.error("Error al crear punto Gauss:", error);
    }
  };

  const chartData = {
    labels: graphData?.points.map((p) => p.x.toFixed(2)) ?? [],
    datasets: [
      {
        label: "Curva de Gauss",
        data: graphData?.points.map((p) => p.y) ?? [],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "rgb(99, 102, 241)",
        pointHoverBorderColor: "white",
        pointHoverBorderWidth: 2,
      },
      ...(graphData?.inputPoint
        ? [
            {
              label: "Área sombreada",
              data: graphData.points.map((p) =>
                p.x <= graphData.inputPoint!.x ? p.y : null
              ),
              borderColor: "rgba(147, 51, 234, 0.6)",
              backgroundColor: "rgba(147, 51, 234, 0.25)",
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointRadius: 0,
            },
          ]
        : []),
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.2,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          padding: 20,
          font: {
            size: 13,
            weight: 'bold',
            family: "'Inter', 'system-ui', sans-serif",
          },
          color: '#1f2937',
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#f9fafb',
        bodyColor: '#e5e7eb',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        boxPadding: 6,
        titleFont: {
          size: 13,
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(4);
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Temperatura (°C)",
          color: '#4b5563',
          font: {
            size: 14,
            weight: 'bold',
            family: "'Inter', 'system-ui', sans-serif",
          },
          padding: { top: 10 },
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
          },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
          drawTicks: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "Densidad de Probabilidad",
          color: '#4b5563',
          font: {
            size: 14,
            weight: 'bold',
            family: "'Inter', 'system-ui', sans-serif",
          },
          padding: { bottom: 10 },
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
          },
          callback: function(value) {
            return (value as number).toFixed(3);
          },
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
          drawTicks: false,
        },
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header con estadísticas */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Curva de Distribución Normal
        </h2>
        <p className="text-gray-500 text-center text-sm">
          Análisis estadístico de temperatura
        </p>
        
        {graphData && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <p className="text-xs font-medium text-blue-600 mb-1">Media (μ)</p>
              <p className="text-lg font-bold text-blue-900">{graphData.mean.toFixed(2)}°C</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
              <p className="text-xs font-medium text-purple-600 mb-1">Desv. Est. (σ)</p>
              <p className="text-lg font-bold text-purple-900">{graphData.standarDeviation.toFixed(2)}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
              <p className="text-xs font-medium text-green-600 mb-1">Mediana</p>
              <p className="text-lg font-bold text-green-900">{graphData.median.toFixed(2)}°C</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
              <p className="text-xs font-medium text-yellow-600 mb-1">Moda</p>
              <p className="text-lg font-bold text-yellow-900">{graphData.mode.toFixed(2)}°C</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
              <p className="text-xs font-medium text-red-600 mb-1">Rango</p>
              <p className="text-lg font-bold text-red-900">{graphData.range.toFixed(2)}°C</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
              <p className="text-xs font-medium text-indigo-600 mb-1">Varianza</p>
              <p className="text-lg font-bold text-indigo-900">{graphData.variance.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Controles */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-6 mb-6 border border-indigo-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Valor a sombrear (°C):
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="Ej: 20.5"
              value={valueToHighlight ?? ""}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setValueToHighlight(isNaN(val) ? null : val);
              }}
              className="w-full sm:w-64 px-4 py-3 text-sm border-2 border-indigo-200 rounded-lg 
                       focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none 
                       transition-all duration-200 bg-white"
            />
          </div>

          <button
            onClick={handleHighlight}
            disabled={valueToHighlight === null || !token}
            className={`px-6 py-3 mt-0 sm:mt-6 rounded-lg font-semibold text-sm 
                       transition-all duration-200 shadow-md
                       ${valueToHighlight === null || !token
                         ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                         : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                       }`}
          >
            {valueToHighlight === null || !token ? "Sombrear" : "Sombrear Área"}
          </button>
        </div>
      </div>

      {/* Gráfica */}
      {graphData ? (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-12 border border-gray-200 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Cargando datos de la curva...</p>
            <p className="text-gray-400 text-sm mt-2">Por favor espera un momento</p>
          </div>
        </div>
      )}
    </div>
  );
}