import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import type { FrecuenciaData } from "../features/Users/User/Domain/FrecuenciaData";

const initialFrecuenciaData: FrecuenciaData = {
  intervalos: [],
  marcas: [],
  fa: [],
  fr: [],
  fac: [],
};

const HumidityContext = createContext<FrecuenciaData>(initialFrecuenciaData);

export const HumidityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [humidityData, setHumidityData] = useState<FrecuenciaData>(initialFrecuenciaData);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws/humidity-stats");

    ws.current.onopen = () => {
      console.log("Conectado al WebSocket (Humidity)");
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.humidity) {
          setHumidityData(data.humidity);
          console.log("Humidity Data:", data.humidity);
        }
      } catch (error) {
        console.error("Error al parsear humedad:", error);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error (Humidity):", error);
    };

    ws.current.onclose = () => {
      console.warn("🔌 WebSocket cerrado (Humidity)");
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  return <HumidityContext.Provider value={humidityData}>{children}</HumidityContext.Provider>;
};

export const useHumidity = () => {
  const context = useContext(HumidityContext);
  if (!context) throw new Error("useHumidity debe usarse dentro de HumidityProvider");
  return context;
};
