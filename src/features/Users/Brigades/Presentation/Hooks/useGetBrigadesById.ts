import { useState, useEffect, useCallback } from "react";
import { BrigadesRepository } from "../../Domain/BrigadesRepository";
import { GetBrigadeByIdUseCase } from "../../Application/GetBrigadesByIdUseCase";
import type { Brigade, BrigadeById } from "../../Domain/Brigades";

interface UseGetBrigadeByIdReturn {
  brigade: BrigadeById | null;
  loading: boolean;
  error: string | null;
  refreshBrigade: () => Promise<void>;
}

export const useGetBrigadeById = (
  idBrigade: number | null
): UseGetBrigadeByIdReturn => {
  const [brigade, setBrigade] = useState<BrigadeById | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Cambiado a true inicial
  const [error, setError] = useState<string | null>(null);

  const fetchBrigade = useCallback(async () => {
    if (!idBrigade) {
      setBrigade(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const repository = new BrigadesRepository();
      const useCase = new GetBrigadeByIdUseCase(repository);
      const data = await useCase.execute(idBrigade);
      
      setBrigade(data);
    } catch (err) {
      console.error("Error fetching brigade:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
      setBrigade(null);
    } finally {
      setLoading(false);
    }
  }, [idBrigade]);

  useEffect(() => {
    fetchBrigade();
  }, [fetchBrigade]);

  return {
    brigade,
    loading,
    error,
    refreshBrigade: fetchBrigade
  };
};