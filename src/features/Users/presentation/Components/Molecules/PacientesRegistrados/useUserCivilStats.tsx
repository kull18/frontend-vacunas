import React, { createContext, useContext, useEffect, useRef, useState } from "react";

export interface UserCivilFormat {
  fol: string;
  corporalTemperature: number;
  alcoholBreat: number;
}

interface UserCivilStatsContextType {
  userCivilData: UserCivilFormat[];
}

const UserCivilStatsContext = createContext<UserCivilStatsContextType>({
  userCivilData: [],
});

export const useUserCivilStats = () => useContext(UserCivilStatsContext);

export const UserCivilStatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userCivilData, setUserCivilData] = useState<UserCivilFormat[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://98.85.230.138:8080/ws/usercivil-stats"); // ⚠ Cambia a tu dominio si es necesario
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (Array.isArray(message)) {
          setUserCivilData(message);
        } else {
          setUserCivilData((prev) => [...prev, message]);
        }
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