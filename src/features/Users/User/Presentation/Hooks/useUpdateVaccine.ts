import { useState } from "react";
import { UpdateVaccineUseCase } from "../../Application/UpdateVaccineUseCase";
import type { Vaccine } from "../../Domain/Vaccine";
import { useAuth } from "./AuthProvider";

export function useUpdateVaccine() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { token } = useAuth();
  const useCase = new UpdateVaccineUseCase();

  const updateVaccine = async (id: number, data: Partial<Vaccine>): Promise<Vaccine> => {
    setLoading(true);
    setError(null);
    try {
      const result = await useCase.execute(id, data, token);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al actualizar la vacuna'));
      throw err; // Re-lanzamos el error para manejo adicional si es necesario
    } finally {
      setLoading(false);
    }
  };

  return { 
    updateVaccine, 
    loading, 
    error,
    resetError: () => setError(null) // Función para resetear el error
  };
}