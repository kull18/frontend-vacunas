import React, { createContext, useContext, useEffect, useRef, useState } from "react";

export interface UserCivilFormat {
  fol: string;
  corporalTemperature: number;
  alcoholBreat: number;
}

interface UserCivilStatsContextType {
  userCivilData: UserCivilFormat | null;
}

const UserCivilStatsContext = createContext<UserCivilStatsContextType>({
  userCivilData: null,
});

export const useUserCivilStats = () => useContext(UserCivilStatsContext);

export const UserCivilStatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userCivilData, setUserCivilData] = useState<UserCivilFormat | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://98.85.230.138:8080/ws/usercivil-stats"); // ⚠ Cambia a tu dominio si es necesario
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
  
        setUserCivilData(message as UserCivilFormat);
        console.log("Datos de usuario civil recibidos:", event.data);
      } catch (error) {
        console.error("Error al parsear mensaje:", error);
      }
    };

    ws.onerror = (err) => console.error("WebSocket error:", err);
    ws.onclose = () => console.log("WebSocket cerrado");

    return () => {
      ws.close();
    };
  }, []);

  return (
    <UserCivilStatsContext.Provider value={{ userCivilData }}>
      {children}
    </UserCivilStatsContext.Provider>
  );
};

export const useUserCivil = () => {
  const context = useContext(UserCivilStatsContext);
  if (context === null) throw new Error("useTemperature debe usarse dentro de TemperatureProvider");
  return context;
};
