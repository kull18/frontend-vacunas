import { useEffect, useState } from "react";
import type { Vaccine } from "../../Domain/Vaccine";
import { VaccineRepository } from "../../Domain/VaccineRepository";
import { useAuth } from "./AuthProvider";
import { GetVaccinesUseCase } from "../../Application/GetVaccinesUseCase";

export function useGetVaccines() {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchVaccines = async () => {
    try {
      setLoading(true);
      const repo = new VaccineRepository();
      const data = await repo.getVaccines(token);
      setVaccines(data);
    } catch (error) {
      console.error("Error fetching vaccines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVaccines();
  }, [token]);

  return { 
    vaccines, 
    setVaccines,
    loading, 
    refetch: fetchVaccines
  };
}