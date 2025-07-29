import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";
import type { GaussPoint } from "./GaussFormat";
import { useGetGaussCurve } from "../../../../User/Presentation/Hooks/useGetGaussCurve";
import { useCreatePointGauss } from "../../../../User/Presentation/Hooks/useCreatePointGauss";
import { useAuth } from "../../../../User/Presentation/Hooks/AuthProvider";

const GaussShadedGraph: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [fullPoints, setFullPoints] = useState<GaussPoint[]>([]);
  const [shadedPoints, setShadedPoints] = useState<GaussPoint[]>([]);
  const {  createPoint } = useCreatePointGauss()
  const { token } = useAuth()

  const fetchWithValue = async () => {
    const floatVal = parseInt(value);
    if (isNaN(floatVal)) return alert("Valor inválido");

    createPoint(token, floatVal)
  };

  return (
    <div>
      <h3>Distribución normal con área sombreada</h3>
      <input
        type="number"
        placeholder="Valor a sombrear"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={fetchWithValue}>Graficar</button>

      {fullPoints.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={fullPoints}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            {/* Área sombreada */}
            <Area
              data={shadedPoints}
              type="monotone"
              dataKey="y"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
              isAnimationActive={false}
            />
            {/* Curva completa */}
            <Line
              type="monotone"
              dataKey="y"
              stroke="#8884d8"
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default GaussShadedGraph;