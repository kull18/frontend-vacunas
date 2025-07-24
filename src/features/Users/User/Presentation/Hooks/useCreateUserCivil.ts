import { useState } from "react";
import { CreateUserCivilUseCase } from "../../Application/CreateUserCivilRepository";
import type { UserCivil } from "../../Domain/UserCIvil";
import { useAuth } from "./AuthProvider";

export const useCreateUserCivil = () => {
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const createUserCivil = async (data: UserCivil): Promise<UserCivil | null> => {
    try {
      const useCase = new CreateUserCivilUseCase();
      return await useCase.execute(data, token);
    } catch (err) {
      setError("Error al crear el usuario civil");
      return null;
    }
  };

  return { createUserCivil, error };
};
