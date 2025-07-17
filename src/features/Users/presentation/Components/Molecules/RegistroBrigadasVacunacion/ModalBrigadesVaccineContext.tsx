import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type ModalContextType = {
  mostrarBrigadesVaccine: boolean;
  abrirModalVaccine: () => void;
  cerrarModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalBrigadesVaccineContext = ({ children }: { children: ReactNode }) => {
  const [mostrarBrigadesVaccine, setMostrar] = useState(false);

  const abrirModalVaccine = () => setMostrar(true);
  const cerrarModal = () => setMostrar(false);

  return (
    <ModalContext.Provider value={{ mostrarBrigadesVaccine, abrirModalVaccine, cerrarModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalBrigadesVaccine = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModalVaccines debe usarse dentro de ModalProvider");
  return context;
};
