import { useEffect, useState } from "react";
import type { Vaccine } from "../../Domain/Vaccine"; // Ajusta según tu estructura
import { VaccineRepository } from "../../Domain/VaccineRepository";

export const useGetVaccines = (token: string | null) => {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [loading, setLoading] = useState(true);

  const getVaccines = async () => {
    if (!token) return;
    try {
      const repo = new VaccineRepository();
      const data = await repo.getVaccines(token);
      setVaccines(data);
    } catch (error) {
      console.error("Error en getVaccines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVaccines();
  }, [token]);

  return { vaccines, loading, refetch: getVaccines };
};
