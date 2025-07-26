import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useGetUserCivilsValues } from "../features/Users/User/Presentation/Hooks/useGetUserCivilVaccinatedValues";
import type { VaccinationResponse } from "../features/Users/User/Domain/VaccinationResponse";

// Contexto
const VaccineDataContext = createContext<VaccinationResponse | null>(null);

// Provider + Hook
export const VaccineDataProvider = ({ children }: { children: ReactNode }) => {
  const [vaccineResponseData, setVaccineResponseData] = useState<VaccinationResponse | null>(null);
  const { userCivilValues } = useGetUserCivilsValues();

  useEffect(() => {
    if (userCivilValues) {
      setVaccineResponseData(userCivilValues);
    }
  }, [userCivilValues]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws/vaccine-stats");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data) {
            console.log("data vaccine", data)
          setVaccineResponseData(data);
        }
      } catch (err) {
        console.error("WebSocket VaccineData error:", err);
      }
    };

    return () => socket.close();
  }, []);

  return (
    <VaccineDataContext.Provider value={vaccineResponseData}>
      {children}
    </VaccineDataContext.Provider>
  );
};

// Hook personalizado dentro del mismo archivo
export const useVaccineData = () => {
  const context = useContext(VaccineDataContext);
  if (context === undefined) {
    throw new Error("useVaccineData debe usarse dentro de VaccineDataProvider");
  }
  return context;
};
