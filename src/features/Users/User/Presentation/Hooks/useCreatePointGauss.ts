import { useState } from "react";
import { SensorsVaccineRepository } from "../../Domain/SensorsVaccineRepository";
import { CreatePointGaussUseCase } from "../../Application/CreatePointGaussUseCase";
import type { GraficResponse } from "../../../presentation/Components/Molecules/Gauss/GaussFormat";

export const useCreatePointGauss = () => {
  const [data, setData] = useState<GraficResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  const createPoint = async (token: string | null, value: number) => {
    setLoading(true);
    setError(null);

    const useCase = new CreatePointGaussUseCase()
    try {
      const result = await useCase.execute(token, value);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err; // Permite manejarlo desde el componente también
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, createPoint };
};
