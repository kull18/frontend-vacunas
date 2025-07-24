// src/Presentation/hooks/useGetVaccines.ts
import { useEffect, useState } from "react";
import { GetVaccinesUseCase } from "../../Application/GetVaccinesUseCase";
import type { Vaccine } from "../../Domain/Vaccine";

export function useGetVaccines() {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('authToken');
  const useCase = new GetVaccinesUseCase(token);

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        setLoading(true);
        const data = await useCase.execute();
        console.log("Fetched vaccines data:", data); // Debug log
        setVaccines(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching vaccines:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch vaccines");
        setVaccines([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVaccines();
  }, []);

  return { vaccines, loading, error };
}