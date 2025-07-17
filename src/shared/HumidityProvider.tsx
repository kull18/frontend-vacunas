// HumidityProvider
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface FrecuenciaData {
  intervalos: string[];
  marcas: number[];
  fa: number[];
  fr: number[];
  fac: number[];
}

interface WebSocketData {
  temperature?: FrecuenciaData;
  humidity?: FrecuenciaData;
}

type WebSocketContextType = {
  temperatureData: FrecuenciaData;
  humidityData: FrecuenciaData;
};

const initialFrecuenciaData: FrecuenciaData = {
  intervalos: [],
  marcas: [],
  fa: [],
  fr: [],
  fac: [],
};

const WebSocketContext = createContext<WebSocketContextType>({
  temperatureData: initialFrecuenciaData,
  humidityData: initialFrecuenciaData,
});

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [temperatureData, setTemperatureData] = useState<FrecuenciaData>(initialFrecuenciaData);
  const [humidityData, setHumidityData] = useState<FrecuenciaData>(initialFrecuenciaData);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws");

    ws.current.onopen = () => {
      console.log("Conectado al WebSocket");
    };

    ws.current.onmessage = (event) => {
      try {
        const data: WebSocketData = JSON.parse(event.data);
        if (data.temperature) setTemperatureData(data.temperature);
        if (data.humidity) setHumidityData(data.humidity);
        console.log(data.humidity)
      } catch (error) {
        console.error("Error al parsear el mensaje WebSocket:", error);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.warn("WebSocket cerrado");
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ temperatureData, humidityData }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket debe usarse dentro de WebSocketProvider");
  }
  return context;
};
