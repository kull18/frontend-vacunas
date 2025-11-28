import { useEffect, useState } from "react";
import { GetUserAccountsUseCase } from "../../Application/GetUserAccountsUseCase";
import type { User } from "../../Domain/User";

export const useGetUserAccounts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const useCase = new GetUserAccountsUseCase();
      const response = await useCase.execute();
      setData(response);
    } catch (error) {
      console.error("Error fetching user accounts:", error);
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