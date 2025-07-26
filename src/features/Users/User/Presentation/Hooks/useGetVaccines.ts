import { useEffect, useState } from "react";
import type { Vaccine } from "../../Domain/Vaccine"; // Ajusta según tu estructura
import { VaccineRepository } from "../../Domain/VaccineRepository";
import { useAuth } from "./AuthProvider";

export const useGetVaccines = () => {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [loading, setLoading] = useState(true);


  const { token } = useAuth()
  console.log("token", token)
  const getVaccines = async () => {
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

  return { vaccines, setVaccines, loading, refetch: getVaccines };
};

