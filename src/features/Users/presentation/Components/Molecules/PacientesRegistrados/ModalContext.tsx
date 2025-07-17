import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type ModalContextType = {
  mostrar: boolean;
  abrirModal: () => void;
  cerrarModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [mostrar, setMostrar] = useState(false);

  const abrirModal = () => setMostrar(true);
  const cerrarModal = () => setMostrar(false);

  return (
    <ModalContext.Provider value={{ mostrar, abrirModal, cerrarModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal debe usarse dentro de ModalProvider");
  return context;
};
