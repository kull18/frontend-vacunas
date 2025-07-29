import { useEffect, useState } from "react";
import { GetGaussCurveUseCase } from "../../Application/GetGaussCurveUseCase";
import type { GraficResponse } from "../../../presentation/Components/Molecules/Gauss/GaussFormat";
import { useAuth } from "./AuthProvider";

export const useGetGaussCurve = () => {
  const [data, setData] = useState<GraficResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const { token } = useAuth()

  const getData = async () => {
    setLoading(true);
    setError(null);

    const useCase = new GetGaussCurveUseCase();

    try {
      const result = await useCase.execute(token);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, loading, error };
};
