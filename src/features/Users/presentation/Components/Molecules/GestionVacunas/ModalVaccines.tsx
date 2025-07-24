import { useState } from "react";
import { useModalVaccines } from "./ModalVaccineContext";
import x from "../../../../../../assets/x.png";
import { useCreateVaccine } from "../../../../User/Presentation/Hooks/useCreateVaccine";
import type { Vaccine } from "../../../../User/Domain/Vaccine";

interface ModalVaccinesProps {
  refetch: () => Promise<void>;
}

function ModalVaccines({ refetch }: ModalVaccinesProps) {
  const { cerrarModal } = useModalVaccines();
  const { createVaccine } = useCreateVaccine();
  const [tipoVacuna, setTipoVacuna] = useState("");

  const handleAgregar = async () => {
    if (tipoVacuna.trim() === "") {
      alert("Por favor, ingresa un tipo de vacuna");
      return;
    }

    const vaccine: Vaccine = {
      idVaccines: 0,
      nameVaccine: tipoVacuna
    };

    try {
      await createVaccine(vaccine);
      cerrarModal();
    } catch (error) {
      alert("Error al agregar la vacuna");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0000002b] backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-[50vh] sm:w-[86vh] rounded-lg shadow-xl p-6 pl-5 border-2 border-[#c0c0c0]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pr-4 pt-3">
          <p className="text-2xl font-semibold text-[#1f3445] ml-5">Agregar vacuna</p>
          <img
            src={x}
            alt="Cerrar"
            className="w-4 cursor-pointer opacity-70 hover:opacity-40 transition-opacity"
            onClick={cerrarModal}
          />
        </div>

        {/* Input */}
        <div className="flex gap-4 py-2">
          <div className="flex flex-col w-full">
            <label htmlFor="tipo" className="text-sm text-gray-800 mb-1 ml-5">
              Tipo de vacuna
            </label>
            <input
              id="tipo"
              type="text"
              value={tipoVacuna}
              onChange={(e) => setTipoVacuna(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm 
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
              placeholder="Ej. Covid-19"
            />
          </div>
        </div>

        {/* Botón */}
        <div className="ml-5 mt-8 mr-4">
          <button
            onClick={handleAgregar}
            className="bg-[#1677FF] text-white py-2 px-4 rounded w-full hover:bg-[#1677ffcc] transition cursor-pointer"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalVaccines;
