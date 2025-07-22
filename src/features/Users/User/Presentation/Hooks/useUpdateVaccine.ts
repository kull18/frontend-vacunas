import { useState } from "react";
import { UpdateVaccineUseCase } from "../../Application/UpdateVaccineUseCase";
import type { Vaccine } from "../../Domain/Vaccine";

export function useUpdateVaccine() {
  const [loading, setLoading] = useState(false);
  const useCase = new UpdateVaccineUseCase();

  const update = async (id: number, data: Partial<Vaccine>) => {
    setLoading(true);
    try {
      return await useCase.execute(id, data);
    } finally {
      setLoading(false);
    }
  };

  return { update, loading };
}
