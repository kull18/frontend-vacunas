import { useState } from "react";
import { useModalVaccines } from "./ModalVaccineContext";
import { useCreateVaccine } from "../../../../User/Presentation/Hooks/useCreateVaccine";
import type { Vaccine } from "../../../../User/Domain/Vaccine";

function ModalVaccinesUpdate() {
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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Agregar vacuna</h2>
          <button 
            onClick={cerrarModal}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Cerrar modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Formulario */}
        <div className="space-y-4">
          {/* Input */}

            <label className="block text-sm font-medium text-gray-700">Tipo de vacuna</label>
<div className="w-full">
  <div className="flex w-full border border-blue-200">
    <input
      type="text"
      value={tipoVacuna}
      onChange={(e) => setTipoVacuna(e.target.value)}
      className="w-full rounded-md border-none text-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
      placeholder="Ej. Covid-19, Influenza, etc."
    />
  </div>
</div>



          {/* Botón */}
          <div className="pt-2">
            <button
              onClick={handleAgregar}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Agregar vacuna
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalVaccinesUpdate;
