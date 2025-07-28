import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type ModalContextType = {
  mostrarVaccinePrincipal: boolean;
  abrirModal: () => void;
  cerrarModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalVaccinePrincipalProvider = ({ children }: { children: ReactNode }) => {
  const [mostrarVaccinePrincipal, setMostrar] = useState(false);

  const abrirModal = () => setMostrar(true);
  const cerrarModal = () => setMostrar(false);

  return (
    <ModalContext.Provider value={{ mostrarVaccinePrincipal, abrirModal, cerrarModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalVaccinesPrincipal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModalVaccines debe usarse dentro de ModalProvider");
  return context;
};
