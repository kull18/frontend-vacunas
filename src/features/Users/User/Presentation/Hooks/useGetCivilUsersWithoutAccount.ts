import { useEffect, useState } from "react";
import { GetCivilUsersWithoutAccountUseCase } from "../../Application/GetCivilUsersWithoutAccountUseCase";
import type { UserCivil } from "../../Domain/User"

export const useGetCivilUsersWithoutAccount = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<UserCivil[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const useCase = new GetCivilUsersWithoutAccountUseCase();
      const response = await useCase.execute();
      setData(response);
    } catch (error) {
      console.error("Error fetching civil users without account:", error);
      setError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};