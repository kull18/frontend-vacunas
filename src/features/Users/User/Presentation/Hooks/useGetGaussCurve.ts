import { useEffect, useState } from "react";
import { GetGaussCurveUseCase } from "../../Application/GetGaussCurveUseCase";
import type { GraficResponse } from "../../../presentation/Components/Molecules/Gauss/GaussFormat";
import { useAuth } from "./AuthProvider";

export const useGetGaussCurve = () => {
  const [data, setData] = useState<GraficResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const { token } = useAuth();

  const getData = async () => {
    setLoading(true);
    setError(null);

    const useCase = new GetGaussCurveUseCase();

    try {
      const result = await useCase.execute(token);
      setData(result);
    } catch (err: any) {
      // ✅ Si es error 400 (no hay datos), tratarlo como caso válido con datos vacíos
      if (err?.response?.status === 400 || err?.status === 400) {
        setData({
          mean: 0,
          standarDeviation: 0,
          median: 0,
          mode: 0,
          range: 0,
          variance: 0,
          points: [],
        });
        setError(null);
      } else {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [token]); // ✅ Agregar token como dependencia

  return { data, loading, error, refetch: getData }; // ✅ Agregar refetch
};