import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useGetAlcohol } from "../features/Users/User/Presentation/Hooks/useGetAlcoholemia";
import type { AlcoholData } from "../features/Users/User/Domain/DataAlcoholemia";

// Contexto
const AlcoholDataContext = createContext<AlcoholData[] | null>(null);

// Provider + Hook
export const AlcoholDataProvider = ({ children }: { children: ReactNode }) => {
  const [alcoholData, setAlcoholData] = useState<AlcoholData[] | null>(null);
  const { data: fetchedAlcoholData } = useGetAlcohol();

  useEffect(() => {
    if (fetchedAlcoholData) {
      setAlcoholData(fetchedAlcoholData);
    }
  }, [fetchedAlcoholData]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws/alcohol-stats");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data) {
          setAlcoholData(data);
        }
      } catch (err) {
        console.error("WebSocket AlcoholData error:", err);
      }
    };

    return () => socket.close();
  }, []);

  return (
    <AlcoholDataContext.Provider value={alcoholData}>
      {children}
    </AlcoholDataContext.Provider>
  );
};

// Hook personalizado dentro del mismo archivo
export const useAlcoholData = () => {
  const context = useContext(AlcoholDataContext);
  if (context === undefined) {
    throw new Error("useAlcoholData debe usarse dentro de AlcoholDataProvider");
  }
  return context;
};
