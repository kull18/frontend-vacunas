import { useState } from "react";
import type { UserCivilVaccinatedData } from "../../Domain/UserCivilVaccinatedData";
import type { UserCivilVaccinated } from "../../Domain/UserCivilVaccinated";
import { CreateUserCivilVaccinatedUseCase } from "../../Domain/CreateUserCivilVaccinatedUseCase";

export function useCreateUserCivilVaccinated() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const useCase = new CreateUserCivilVaccinatedUseCase();

  const createUserCivilVaccinated = async (
    data: UserCivilVaccinated
  ): Promise<UserCivilVaccinated | null> => {
    setLoading(true);
    setError(null);

    try {
      const response: UserCivilVaccinated = await useCase.execute(data);
      return response;
    } catch (err: any) {
      setError(err.message || "Error al registrar vacunación");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createUserCivilVaccinated,
    loading,
    error,
  };
}
