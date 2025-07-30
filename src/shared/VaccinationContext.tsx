import { createContext, useContext, useCallback } from "react";
import { useGetUserCivilsValues } from "../features/Users/User/Presentation/Hooks/useGetUserCivilVaccinatedValues";
import type { VaccinationResponse } from "../features/Users/User/Domain/VaccinationResponse";

interface VaccinationContextProps {
  userCivilValues: VaccinationResponse | null;
  loading: boolean;
  refetchValues: () => Promise<VaccinationResponse | null>;
}

const VaccinationContext = createContext<VaccinationContextProps | undefined>(undefined);

export const VaccinationProvider = ({ children }: { children: React.ReactNode }) => {
  const { userCivilValues, loading, refetch } = useGetUserCivilsValues();

  const refetchValues = useCallback(() => {
    return refetch(); 
  }, [refetch]);

  return (
    <VaccinationContext.Provider value={{ userCivilValues, loading, refetchValues }}>
      {children}
    </VaccinationContext.Provider>
  );
};

export const useVaccinationContext = () => {
  const context = useContext(VaccinationContext);
  if (!context) {
    throw new Error("useVaccinationContext must be used within a VaccinationProvider");
  }
  return context;
};
