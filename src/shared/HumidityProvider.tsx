import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import type { FrecuenciaData } from "../features/Users/User/Domain/FrecuenciaData";
import { getWebSocketURL } from "./utils/websocket" 

const initialFrecuenciaData: FrecuenciaData = {
  intervalos: [],
  marcas: [],
  fa: [],
  fr: [],
  fac: [],
};

const HumidityContext = createContext<FrecuenciaData | null>(null);

export const HumidityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [humidityData, setHumidityData] = useState<FrecuenciaData>(initialFrecuenciaData);
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<number | null>(null);
  const reconnectAttempts = useRef(0);

  const maxReconnectAttempts = 10;

  const connectWebSocket = () => {
    // 🎯 Usar la función auxiliar
    const wsURL = getWebSocketURL("/ws/humidity-stats");
    ws.current = new WebSocket(wsURL);

    ws.current.onopen = () => {
      console.log("✅ Conectado al WebSocket (Humidity)");
      reconnectAttempts.current = 0;
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data && data.humidity) {
          setHumidityData(data.humidity);
          console.log("Humidity Data:", data.humidity);
        } else {
          console.warn("Mensaje WS humedad no contiene 'humidity':", data);
        }
      } catch (error) {
        console.error("Error al parsear humedad:", error);
      }
    };

    ws.current.onerror = (error) => {
      console.error("❌ WebSocket error (Humidity):", error);
    };

    ws.current.onclose = () => {
      console.warn("🔌 WebSocket cerrado (Humidity)");

      if (reconnectAttempts.current < maxReconnectAttempts) {
        const timeout = Math.min(1000 * 2 ** reconnectAttempts.current, 30000);
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

  if (humidityData === null) {
    return null;
  }

  return <HumidityContext.Provider value={humidityData}>{children}</HumidityContext.Provider>;
};

export const useHumidity = () => {
  const context = useContext(HumidityContext);
  if (context === null) throw new Error("useHumidity debe usarse dentro de HumidityProvider");
  return context;
};