import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
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
        borderColor: "blue",
        fill: false,
      },
      ...(graphData?.inputPoint
        ? [
            {
              label: "Área sombreada",
              data: graphData.points.map((p) =>
                p.x <= graphData.inputPoint!.x ? p.y : null
              ),
              borderColor: "rgba(0,0,255,0.4)",
              backgroundColor: "rgba(0,0,255,0.2)",
              fill: true,
            },
          ]
        : []),
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: "Temperatura" } },
      y: { title: { display: true, text: "Densidad" } },
    },
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#2c3e50",
          fontSize: "24px",
          fontWeight: "600",
        }}
      >
        Curva de Distribución Normal
      </h2>

      {/* Controles arriba de la gráfica */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          border: "1px solid #e9ecef",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#495057",
              marginBottom: "5px",
            }}
          >
            Valor a sombrear:
          </label>
          <input
            type="number"
            placeholder="Ingrese un valor"
            value={valueToHighlight ?? ""}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setValueToHighlight(isNaN(val) ? null : val);
            }}
            style={{
              padding: "12px 16px",
              fontSize: "14px",
              border: "2px solid #dee2e6",
              borderRadius: "8px",
              outline: "none",
              transition: "all 0.3s ease",
              width: "200px",
              backgroundColor: "white",
            }}
            onFocus={(e) => {
              const target = e.target as HTMLInputElement;
              target.style.borderColor = "#007bff";
              target.style.boxShadow = "0 0 0 3px rgba(0,123,255,0.1)";
            }}
            onBlur={(e) => {
              const target = e.target as HTMLInputElement;
              target.style.borderColor = "#dee2e6";
              target.style.boxShadow = "none";
            }}
          />
        </div>

        <button
          onClick={handleHighlight}
          disabled={valueToHighlight === null || !token}
          style={{
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: "500",
            color: "white",
            backgroundColor:
              valueToHighlight === null || !token ? "#6c757d" : "#007bff",
            border: "none",
            borderRadius: "8px",
            cursor:
              valueToHighlight === null || !token ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            marginTop: "25px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLButtonElement;
            if (valueToHighlight !== null && token) {
              target.style.backgroundColor = "#0056b3";
              target.style.transform = "translateY(-1px)";
              target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
            }
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLButtonElement;
            if (valueToHighlight !== null && token) {
              target.style.backgroundColor = "#007bff";
              target.style.transform = "translateY(0)";
              target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
            }
          }}
        >
          {valueToHighlight === null || !token
            ? "Sombrear"
            : "Sombrear Área"}
        </button>
      </div>

      {/* Gráfica */}
      {graphData ? (
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e9ecef",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            backgroundColor: "#f8f9fa",
            borderRadius: "12px",
            border: "1px solid #e9ecef",
          }}
        >
          <p
            style={{
              fontSize: "16px",
              color: "#6c757d",
              margin: 0,
            }}
          >
            Cargando curva...
          </p>
        </div>
      )}
    </div>
  );
}
