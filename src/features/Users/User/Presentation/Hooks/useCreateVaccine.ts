import { useState } from "react";
import { CreateVaccineUseCase } from "../../Application/CreateVaccine";
import type { Vaccine, VaccineName } from "../../Domain/Vaccine";
import { useAuth } from "./AuthProvider";

export function useCreateVaccine() {
  const [loadingVaccine, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [createdVaccine, setCreatedVaccine] = useState<Vaccine | null>(null);
  const { token } = useAuth();

  const createVaccine = async (newVaccine: VaccineName): Promise<Vaccine> => {
    setLoading(true);
    setError(null);
    try {
      const useCase = new CreateVaccineUseCase(token);
      const result = await useCase.execute(newVaccine);
      setCreatedVaccine(result as Vaccine);
      return result as Vaccine;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    createVaccine, 
    loadingVaccine, 
    error, 
    createdVaccine 
  };
}