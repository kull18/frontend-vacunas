import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type ModalContextType = {
  mostrarBrigades: boolean;
  abrirModal: () => void;
  cerrarModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalBrigadesContext = ({ children }: { children: ReactNode }) => {
  const [mostrarBrigades, setMostrar] = useState(false);

  const abrirModal = () => setMostrar(true);
  const cerrarModal = () => setMostrar(false);

  return (
    <ModalContext.Provider value={{ mostrarBrigades, abrirModal, cerrarModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalBrigades = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModalVaccines debe usarse dentro de ModalProvider");
  return context;
};
