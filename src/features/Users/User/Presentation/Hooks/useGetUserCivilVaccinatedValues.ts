import { useEffect, useState } from "react";
import type { UserCivilVaccinatedData } from "../../Domain/UserCivilVaccinatedData";
import { GetUserCivilVaccinatedValuesUseCase } from "../../Application/GetUserCivilVaccinatedValuesUseCsae";
import type { VaccinationResponse } from "../../Domain/VaccinationResponse";

export const useGetUserCivilsValues = () => {
  const [userCivilValues, setUserCivilValues] = useState<VaccinationResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserCivilValues = async () => {
    try {
      const repo = new GetUserCivilVaccinatedValuesUseCase();
      const data = await repo.execute();
      setUserCivilValues(data);
    } catch (error) {
      console.error("Error en getVaccines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserCivilValues();
  }, []);

  return { userCivilValues, loading, refetch: getUserCivilValues };
};
