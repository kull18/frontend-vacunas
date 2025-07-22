// src/Presentation/hooks/useDeleteVaccine.ts
import { useState } from "react";
import { DeleteVaccineUseCase } from "../../Application/DeleteVaccineUseCase";

export function useDeleteVaccine() {
  const [loading, setLoading] = useState(false);
  const useCase = new DeleteVaccineUseCase();

  const remove = async (id: number) => {
    setLoading(true);
    try {
      return await useCase.execute(id);
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading };
}
