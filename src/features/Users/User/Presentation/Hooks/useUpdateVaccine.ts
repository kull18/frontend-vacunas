import { useState } from "react";
import { UpdateVaccineUseCase } from "../../Application/UpdateVaccineUseCase";
import type { Vaccine } from "../../Domain/Vaccine";
import { useAuth } from "./AuthProvider";

export function useUpdateVaccine() {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth()
  const useCase = new UpdateVaccineUseCase();

  const update = async (id: number, data: Partial<Vaccine>) => {
    setLoading(true);
    try {
      return await useCase.execute(id, data, token);
    } finally {
      setLoading(false);
    }
  };

  return { update, loading };
}
