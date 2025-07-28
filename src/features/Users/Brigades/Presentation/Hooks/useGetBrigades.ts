import { useState, useEffect, useCallback } from "react";
import { BrigadesRepository } from "../../Domain/BrigadesRepository";
import type { Brigade } from "../../Domain/Brigades";

interface GroupedBrigade {
  idBrigade: number;
  referenceBrigade: string;
  startDate: string;
  endDate: string;
  locationsCount: number;
}

export const useGetBrigades = () => {
  const [groupedBrigades, setGroupedBrigades] = useState<GroupedBrigade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const processData = (data: any[]): GroupedBrigade[] => {
    const brigadesMap = new Map<number, GroupedBrigade>();

    data.forEach(item => {
      if (!brigadesMap.has(item.idBrigade)) {
        brigadesMap.set(item.idBrigade, {
          idBrigade: item.idBrigade,
          referenceBrigade: item.referenceBrigade,
          startDate: item.startDate,
          endDate: item.endDate,
          locationsCount: 1 // Inicializamos con 1 ubicación
        });
      } else {
        const existing = brigadesMap.get(item.idBrigade)!;
        brigadesMap.set(item.idBrigade, {
          ...existing,
          locationsCount: existing.locationsCount + 1
        });
      }
    });

    return Array.from(brigadesMap.values());
  };

  const fetchBrigades = useCallback(async () => {
    try {
      setLoading(true);
      const repository = new BrigadesRepository();
      const data = await repository.getAllBrigades();
      
      if (!data) throw new Error("No se recibieron datos");
      
      setGroupedBrigades(processData(data));
      setError(null);
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
      setGroupedBrigades([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrigades();
  }, [fetchBrigades]);

  return {
    groupedBrigades,
    loading,
    error,
    refreshBrigades: fetchBrigades
  };
};