import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type WebSocketContextType = {
    messages: number[];
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<number[]>([]);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8000/ws");

        ws.current.onopen = () => {
            console.log("Conectado al WebSocket");
        };

        ws.current.onmessage = (event) => {
            const parseData = parseFloat(event.data);

            setMessages(prev => [...prev, parseData]);
        };

        ws.current.onerror = (error) => {
            console.error("Error en WebSocket:", error);
        };

        ws.current.onclose = () => {
            console.warn("WebSocket cerrado");
        };

        //clean the componen when it closed
        return () => {
            ws.current?.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ messages }}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Hook personalizado
export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocket debe usarse dentro de WebSocketProvider");
    }
    return context;
};
