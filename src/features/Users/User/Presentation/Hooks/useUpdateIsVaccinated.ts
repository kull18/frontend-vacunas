import { useEffect, useState } from "react";
import { UpdateIsVaccinatedCivilUseCase } from "../../Application/updateIsVaccinated";
import type { UserCivil } from "../../Domain/UserCIvil";

export const useUpdateIsVaccinated = () => {
  const [loading, setLoading] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<UserCivil | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const useCase = new UpdateIsVaccinatedCivilUseCase();        
      const user = await useCase.execute(id);
      setUpdatedUser(user);
      return user;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    execute,
    loading,
    error,
    updatedUser,
  };
};
