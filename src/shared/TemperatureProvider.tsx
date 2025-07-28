import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface FrecuenciaData {
  fa: number[];
  fac: number[];
  fr: number[];
  intervalos: string[];
  marcas: number[];
}

const TemperatureContext = createContext<FrecuenciaData | null>(null);

export const TemperatureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [temperatureData, setTemperatureData] = useState<FrecuenciaData>({
    intervalos: [],
    marcas: [],
    fa: [],
    fr: [],
    fac: [],
  });
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<number | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 10;

  const connectWebSocket = () => {
    ws.current = new WebSocket("ws://localhost:8080/ws/temperature-stats");

    ws.current.onopen = () => {
      console.log("Conectado al WebSocket (Temperature)");
      reconnectAttempts.current = 0;
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data && data.temperature) {
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
      console.warn("🔌 WebSocket cerrado (Temperature)");

      if (reconnectAttempts.current < maxReconnectAttempts) {
        const timeout = Math.min(1000 * 2 ** reconnectAttempts.current, 30000); // max 30s
        console.log(`Intentando reconectar en ${timeout / 1000}s...`);
        reconnectTimeout.current = window.setTimeout(() => {
          reconnectAttempts.current++;
          connectWebSocket();
        }, timeout);
      } else {
        console.error("No se pudo reconectar después de varios intentos.");
      }
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      ws.current?.close();
    };
  }, []);

  return <TemperatureContext.Provider value={temperatureData}>{children}</TemperatureContext.Provider>;
};

export const useTemperature = () => {
  const context = useContext(TemperatureContext);
  if (context === null) throw new Error("useTemperature debe usarse dentro de TemperatureProvider");
  return context;
};
