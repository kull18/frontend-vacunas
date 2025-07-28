import { useState } from "react";
import type { Brigade } from "../../Domain/Brigades";
import { CreateBrigadeUseCase } from "../../Application/CreateBrigadesUseCase";

interface UseCreateBrigadesReturn {
  createBrigade: (brigadeData: Omit<Brigade, 'id'>) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

export const useCreateBrigades = (createBrigadeUseCase: CreateBrigadeUseCase): UseCreateBrigadesReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createBrigade = async (brigadeData: Omit<Brigade, 'id'>) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createBrigadeUseCase.execute(brigadeData);
      setSuccess(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create brigade";
      setError(message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    createBrigade,
    loading,
    error,
    success,
    reset
  };
};