import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type ModalContextType = {
  mostrarBoxs: boolean;
  abrirModal: () => void;
  cerrarModal: () => void;
};

const ModalBoxVaccinesContext = createContext<ModalContextType | undefined>(undefined);

export const ModalBoxsProvider = ({ children }: { children: ReactNode }) => {
  const [mostrarBoxs, setMostrar] = useState(false);

  const abrirModal = () => setMostrar(true);
  const cerrarModal = () => setMostrar(false);

  return (
    <ModalBoxVaccinesContext.Provider value={{ mostrarBoxs, abrirModal, cerrarModal }}>
      {children}
    </ModalBoxVaccinesContext.Provider>
  );
};

export const useModalBoxs = () => {
  const context = useContext(ModalBoxVaccinesContext);
  if (!context) throw new Error("useModalBoxs debe usarse dentro de ModalBoxxsVaccines");
  return context;
};
