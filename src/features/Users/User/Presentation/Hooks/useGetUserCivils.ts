import { useEffect, useState } from "react";
import { GetUserCivilsUseCase } from "../../Application/GetUserCivilUseCase";
import type { UserCivil } from "../../Domain/UserCIvil";
import { useAuth } from "./AuthProvider";

export const useGetUserCivils = () => {
  const [userCivils, setUserCivils] = useState<UserCivil[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const fetchUserCivils = async () => {
    try {
      setLoading(true);
      const useCase = new GetUserCivilsUseCase();
      const result = await useCase.execute(token);
      setUserCivils(result);
    } catch (err) {
      setError("Error al obtener los usuarios civiles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCivils();
  }, [token]);

  return {
    userCivils,
    setUserCivils,
    loading,
    error,
    refetchUserCivils: fetchUserCivils 
  };
};
