import { useState } from "react";
import { UpdateUserCivilUseCase } from "../../Application/UpdateUserCivilRepository";
import type { UserCivil } from "../../Domain/UserCIvil";
import { useAuth } from "./AuthProvider";

export const useUpdateUserCivil = () => {
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const updateUserCivil = async (
    id: number,
    updatedData: Partial<UserCivil>
  ): Promise<UserCivil | null> => {
    try {
      const useCase = new UpdateUserCivilUseCase();
      return await useCase.execute(id, updatedData, token);
    } catch (err) {
      setError("Error al actualizar el usuario civil");
      return null;
    }
  };

  return { updateUserCivil, error };
};
