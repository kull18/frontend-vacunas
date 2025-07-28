import { useEffect, useState } from "react";
import type { Statistics } from "../../Domain/Statics";
import { getStatisticsUseCase } from "../../Application/getStatisticsUseCase";

export function useGetStatistics() {
  const [data, setData] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await getStatisticsUseCase();
        setData(stats);
      } catch (err) {
        setError("Error al obtener estadísticas");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { data, loading, error };
}
