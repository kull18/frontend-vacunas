// src/Presentation/hooks/useDeleteVaccine.ts
import { useEffect, useState } from "react";
import { DeleteVaccineUseCase } from "../../Application/DeleteVaccineUseCase";
import { useAuth } from "./AuthProvider";

export function useDeleteVaccine() {
  const [loadingDelete, setLoading] = useState(false);
  const { token } = useAuth();

  const remove = async (id: number): Promise<boolean> => {
    setLoading(true);
    try {
      const uc = new DeleteVaccineUseCase();
      const success = await uc.execute(id, token);
      return success;
    } catch (error) {
      console.log("error to delete vaccine in hook", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loadingDelete };
}
