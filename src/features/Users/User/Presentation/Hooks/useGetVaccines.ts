// src/Presentation/hooks/useGetVaccines.ts
import { useEffect, useState } from "react";
import { GetVaccinesUseCase } from "../../Application/GetVaccinesUseCase";
import type { Vaccine } from "../../Domain/Vaccine";

export function useGetVaccines() {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [loading, setLoading] = useState(true);
  const useCase = new GetVaccinesUseCase();

  useEffect(() => {
    (async () => {
      try {
        const data = await useCase.execute();
        console.log("set data", data)
        setVaccines(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { vaccines, loading };
}
