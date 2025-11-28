import { useState } from "react";
import { UpdateUserUseCase } from "../../Application/UpdateUserUseCase";
import { UserRepository } from "../../Domain/UserRepository";
import type { User } from "../../Domain/User";

export const useUpdateUser = () => {
  const [error, setError] = useState<string | null>(null);
  const useUpdateUserHandler = async (
    id: number,
    updatedData: Partial<User>
  ): Promise<User | null> => {
    try {
      const repositorie = new UserRepository()
      const useCase = new UpdateUserUseCase(repositorie);
      return await useCase.execute(id, updatedData);
    } catch (err) {
      setError("Error al actualizar el usuario civil");
      return null;
    }
  };

  return { useUpdateUserHandler, error };
};
