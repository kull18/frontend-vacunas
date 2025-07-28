import { useEffect, useState } from "react";
import type { Hospital } from "../../Domain/Hospital";
import { GetHospitalsUseCase } from "../../Application/GetHospitalsUseCase";
import { useAuth } from "./AuthProvider";

export const useGetHospitals = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth()
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const useCase = new GetHospitalsUseCase();
        const data = await useCase.execute(token);
        setHospitals(data);
      } catch (err) {
        console.error("Error al obtener hospitales:", err);
        setError("No se pudo cargar la lista de hospitales.");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return { hospitals, loading, error };
};
