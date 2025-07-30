import { useEffect, useState, useCallback, useRef } from "react";
import type { VaccinationResponse } from "../../Domain/VaccinationResponse";
import { GetUserCivilVaccinatedValuesUseCase } from "../../Application/GetUserCivilVaccinatedValuesUseCsae";

export const useGetUserCivilsValues = () => {
  const [userCivilValues, setUserCivilValues] = useState<VaccinationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchCount, setRefetchCount] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const getUserCivilValues = useCallback(async (): Promise<VaccinationResponse | null> => {
    try {
      // Cancelar petición anterior si existe
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Crear nuevo AbortController
      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError(null);

      const useCase = new GetUserCivilVaccinatedValuesUseCase();
      const data = await useCase.execute();
      
      // Solo actualizar si la petición no fue cancelada
      if (!abortControllerRef.current.signal.aborted) {
        setUserCivilValues(data);
        return data;
      }
      
      return null;
    } catch (error) {
      // Solo manejar error si la petición no fue cancelada
      if (!abortControllerRef.current?.signal.aborted) {
        console.error("Error en getUserCivilValues:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
        setUserCivilValues(null);
      }
      return null;
    } finally {
      // Solo actualizar loading si la petición no fue cancelada
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  // Función para refetch manual
  const refetch = useCallback(async (): Promise<VaccinationResponse | null> => {
    setRefetchCount(prev => prev + 1);
    return await getUserCivilValues();
  }, [getUserCivilValues]);

  // Función para refetch silencioso (sin mostrar loading)
  const silentRefetch = useCallback(async (): Promise<VaccinationResponse | null> => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setError(null);

      const useCase = new GetUserCivilVaccinatedValuesUseCase();
      const data = await useCase.execute();
      
      if (!abortControllerRef.current.signal.aborted) {
        setUserCivilValues(data);
        return data;
      }
      
      return null;
    } catch (error) {
      if (!abortControllerRef.current?.signal.aborted) {
        console.error("Error en silentRefetch:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      }
      return null;
    }
  }, []);

  // Efecto inicial
  useEffect(() => {
    getUserCivilValues();

    // Cleanup: cancelar petición al desmontar
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [getUserCivilValues]);

  // Efecto para refetch cuando se solicite
  useEffect(() => {
    if (refetchCount > 0) {
      getUserCivilValues();
    }
  }, [refetchCount, getUserCivilValues]);

  return {
    userCivilValues,
    loading,
    error,
    refetch,
    silentRefetch,
    // Función para invalidar cache y forzar refetch
    invalidateAndRefetch: refetch,
  };
};