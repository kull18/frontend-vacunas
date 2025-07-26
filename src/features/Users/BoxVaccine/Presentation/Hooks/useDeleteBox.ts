import { useState } from "react";
import { BoxRepository } from "../../Domain/BoxVaccineRepository";

interface UseDeleteBoxReturn {
  deleteBox: (id: number, token: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const useDeleteBox = (boxRepository: BoxRepository): UseDeleteBoxReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteBox = async (id: number, token: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (isNaN(id) || id <= 0) {
        throw new Error("El ID de la caja debe ser un número positivo");
      }

      const result = await boxRepository.deleteBox(id);
      setSuccess(result);
      return result;
    } catch (err: any) {
      setError(err.message || "Error al eliminar la caja");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteBox, loading, error, success };
};
