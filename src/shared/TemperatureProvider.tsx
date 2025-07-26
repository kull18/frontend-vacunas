import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface FrecuenciaData {
  intervalos: string[];
  marcas: number[];
  fa: number[];
  fr: number[];
  fac: number[];
}

const initialFrecuenciaData: FrecuenciaData = {
  intervalos: [],
  marcas: [],
  fa: [],
  fr: [],
  fac: [],
};

const TemperatureContext = createContext<FrecuenciaData>(initialFrecuenciaData);

export const TemperatureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [temperatureData, setTemperatureData] = useState<FrecuenciaData>(initialFrecuenciaData);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws/temperature-stats");

    ws.current.onopen = () => {
      console.log("Conectado al WebSocket (Temperature)");
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.temperature) {
          setTemperatureData(data.temperature);
          console.log("Temperature Data:", data.temperature);
        }
      } catch (error) {
        console.error("Error al parsear temperatura:", error);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error (Temperature):", error);
    };

    ws.current.onclose = () => {
      console.warn("WebSocket cerrado (Temperature)");
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  return <TemperatureContext.Provider value={temperatureData}>{children}</TemperatureContext.Provider>;
};

export const useTemperature = () => {
  const context = useContext(TemperatureContext);
  if (!context) throw new Error("useTemperature debe usarse dentro de TemperatureProvider");
  return context;
};
