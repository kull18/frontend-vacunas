import { useEffect, useState } from "react";
import { GetVaccineAmountUseCase } from "../../Application/GetVaccineAmountUseCase";
import type { VaccineVaccineBox } from "../../Domain/VaccineVaccineBox";
import { useAuth } from "./AuthProvider";

export function useGetVaccineAmount() {
  const [data, setData] = useState<VaccineVaccineBox[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth()

  useEffect(() => {
    const useCase = new GetVaccineAmountUseCase();

    useCase.execute(token)
      .then((result) => {
        console.log("result", result)
        setData(result);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    data,
    loading,
    error,
  };
}
