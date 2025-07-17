import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type ModalContextType = {
  mostrarVaccine: boolean;
  abrirModal: () => void;
  cerrarModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalVaccineProvider = ({ children }: { children: ReactNode }) => {
  const [mostrarVaccine, setMostrar] = useState(false);

  const abrirModal = () => setMostrar(true);
  const cerrarModal = () => setMostrar(false);

  return (
    <ModalContext.Provider value={{ mostrarVaccine, abrirModal, cerrarModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalVaccines = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModalVaccines debe usarse dentro de ModalProvider");
  return context;
};
