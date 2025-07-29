import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { GraficResponse } from "./GaussFormat";
import { useGetGaussCurve } from "../../../../User/Presentation/Hooks/useGetGaussCurve";

const GaussSimpleGraph: React.FC = () => {
  const { data: dataGauss, loading, error } = useGetGaussCurve();
  const [data, setData] = useState<GraficResponse | null>(null);

  useEffect(() => {
    if (dataGauss) {
      setData(dataGauss);
    }
  }, [dataGauss]);


  return (
    <div>
      <h3>Distribución normal sin sombreado</h3>
      {data && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data.points}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              label={{
                value: "Temperatura",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              label={{
                value: "Densidad",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default GaussSimpleGraph;
