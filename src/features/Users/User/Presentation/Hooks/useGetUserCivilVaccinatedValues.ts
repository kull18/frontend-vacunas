import { useEffect, useState, useCallback, useRef } from "react";
import type { VaccinationNameCountGraph, VaccinationResponse } from "../../Domain/VaccinationResponse";
import { GetUserCivilVaccinatedValuesUseCase } from "../../Application/GetUserCivilVaccinatedValuesUseCsae";

export const useGetUserCivilsValues = () => {
  const [userCivilValues, setUserCivilValues] = useState<VaccinationNameCountGraph | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchUserCivilValues = async() => {
    setLoading(true)
    try {
      const uc = new GetUserCivilVaccinatedValuesUseCase()

      const response = await uc.execute()

      if(!response) {
        throw new Error("error to fetch data")
      }

      setUserCivilValues(response)
    }catch(error) {
      setError(error)
      throw error
    }finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserCivilValues()
  }, [])

  return {
    userCivilValues,
    loading,
    error,
    refetch: fetchUserCivilValues,
  };
};