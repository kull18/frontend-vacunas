import { useState, useCallback } from "react";
import { BrigadesRepository } from "../../Domain/BrigadesRepository";
import type { Brigade } from "../../Domain/Brigades";

interface UseDeleteBrigadeReturn {
  deleteBrigade: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

export const useDeleteBrigade = (brigadesRepository: BrigadesRepository): UseDeleteBrigadeReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteBrigade = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No hay token de autenticación");
      }

      // Call the repository to delete the brigade
      await brigadesRepository.deleteBrigades(id);

      setSuccess(true);
    } catch (err) {
      console.error("Error deleting brigade:", err);
      setError(err instanceof Error ? err.message : "Error al eliminar la brigada");
    } finally {
      setLoading(false);
    }
  }, [brigadesRepository]);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    deleteBrigade,
    loading,
    error,
    success,
    reset
  };
};