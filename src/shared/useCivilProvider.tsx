import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { getWebSocketURL } from "./utils/websocket"; 

export interface UserCivilFormat {
  fol: string;
  corporalTemperature: number;
  alcoholBreat: number;
}

interface UserCivilStatsContextType {
  userCivilData: UserCivilFormat | null;
  isConnected: boolean;
  reconnect: () => void;
}

const UserCivilStatsContext = createContext<UserCivilStatsContextType>({
  userCivilData: null,
  isConnected: false,
  reconnect: () => {},
});

export const useUserCivilStats = () => useContext(UserCivilStatsContext);

export const UserCivilStatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userCivilData, setUserCivilData] = useState<UserCivilFormat | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const mountedRef = useRef(true); // 👈 Para evitar reconexiones después de desmontar
  const maxReconnectAttempts = 10;
  const baseReconnectDelay = 2000; // 👈 Aumentado a 2 segundos

  const connect = useCallback(() => {
    if (!mountedRef.current) {
      console.log("⚠️ Componente desmontado, cancelando conexión");
      return;
    }

    if (wsRef.current) {
      console.log("🧹 Limpiando conexión anterior");
      wsRef.current.onclose = null;
      wsRef.current.close();
      wsRef.current = null;
    }

    const wsURL = getWebSocketURL("/ws/usercivil-stats");
    console.log("🔌 Conectando a WebSocket:", wsURL);
    
    try {
      const ws = new WebSocket(wsURL);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!mountedRef.current) return; 
        
        console.log("WebSocket UserCivil conectado");
        setIsConnected(true);
        reconnectAttemptsRef.current = 0;
      };

      ws.onmessage = (event) => {
        if (!mountedRef.current) return; 
        
        console.log("Mensaje raw recibido:", event.data);
        
        try {
          const message = JSON.parse(event.data);
          console.log("Mensaje parseado:", message);
          
          setUserCivilData(message as UserCivilFormat);
          console.log("Datos de usuario civil actualizados:", message);
        } catch (error) {
          console.error("Error al parsear mensaje:", error);
        }
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
        if (mountedRef.current) {
          setIsConnected(false);
        }
      };

      ws.onclose = (event) => {
        console.log("🔌 WebSocket cerrado:", event.code, event.reason);
        
        if (!mountedRef.current) {
          console.log("⚠️ Componente desmontado, no se reconectará");
          return;
        }
        
        setIsConnected(false);
        
        // Solo reconectar si no se ha alcanzado el máximo de intentos
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current += 1;
          const delay = Math.min(
            baseReconnectDelay * Math.pow(2, reconnectAttemptsRef.current - 1),
            30000
          );
          
          console.log(
            `🔄 Intentando reconectar (intento ${reconnectAttemptsRef.current}/${maxReconnectAttempts}) en ${delay}ms...`
          );
          
          // Limpiar timeout anterior si existe
          if (reconnectTimeoutRef.current !== null) {
            window.clearTimeout(reconnectTimeoutRef.current);
          }
          
          reconnectTimeoutRef.current = window.setTimeout(() => {
            if (mountedRef.current) { // 👈 Verificar antes de reconectar
              connect();
            }
          }, delay);
        } else {
          console.error("❌ Máximo número de intentos de reconexión alcanzado");
        }
      };
    } catch (error) {
      console.error("❌ Error al crear WebSocket:", error);
      if (mountedRef.current) {
        setIsConnected(false);
      }
    }
  }, []);

  const reconnect = useCallback(() => {
    console.log("🔄 Reconexión manual solicitada");
    reconnectAttemptsRef.current = 0;
    
    if (reconnectTimeoutRef.current !== null) {
      window.clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    connect();
  }, [connect]);

  useEffect(() => {
    mountedRef.current = true;
    connect();

    return () => {
      console.log("🧹 Limpiando WebSocket UserCivil");
      mountedRef.current = false; // 👈 Marcar como desmontado
      
      // Limpiar timeout
      if (reconnectTimeoutRef.current !== null) {
        window.clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      
      // Cerrar WebSocket
      if (wsRef.current) {
        wsRef.current.onclose = null; // 👈 Remover handler antes de cerrar
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [connect]);

  return (
    <UserCivilStatsContext.Provider value={{ userCivilData, isConnected, reconnect }}>
      {children}
    </UserCivilStatsContext.Provider>
  );
};

export const useUserCivil = () => {
  const context = useContext(UserCivilStatsContext);
  if (context === null) throw new Error("useUserCivil debe usarse dentro de UserCivilStatsProvider");
  return context;
};