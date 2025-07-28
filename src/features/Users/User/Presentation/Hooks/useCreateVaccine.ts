import { useState } from "react";
import { CreateVaccinesUseCase } from "../../Application/CreateVaccine";
import type { Vaccine } from "../../Domain/Vaccine";
import { useAuth } from "./AuthProvider";

// En useCreateVaccine.ts
export function useCreateVaccine() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const createVaccine = async (vaccineData: { nameVaccine: string }) => {
    setLoading(true);
    setError(null);
    try {
      const useCase = new CreateVaccinesUseCase();
      const result = await useCase.execute(vaccineData, token);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setError(message);
      throw err; // Re-lanzar el error para que pueda ser capturado por el componente
    } finally {
      setLoading(false);
    }
  };

  return { createVaccine, loading, error };
}