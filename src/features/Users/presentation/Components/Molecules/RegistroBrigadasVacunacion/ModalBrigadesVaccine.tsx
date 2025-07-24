import x from "../../../../../../assets/x.png"
import add from "../../../../../../assets/add.png"
import edit from "../../../../../../assets/edit.png"
import deleted from "../../../../../../assets/delete.png"
import { useModalBrigadesVaccine } from "./ModalBrigadesVaccineContext";
import { useGetVaccines } from "../../../../User/Presentation/Hooks/useGetVaccines";
import { useState } from "react";
import { useCreateBox } from "../../../../BoxVaccine/Presentation/Hooks/useCreateBoxVaccine";
import { useCreateBoxAmount } from "../../../../BoxVaccine/Presentation/Hooks/useCreateBoxAmountVaccine";
function ModalBrigadesVaccine() {
  const { cerrarModal } = useModalBrigadesVaccine();
  const { vaccines, loading } = useGetVaccines();
  const [selectedVaccines, setSelectedVaccines] = useState<{ id: number; name: string }[]>([]);
  const { createBox, loadingBox, error } = useCreateBox();
  const { createBoxAmount, loadingBoxAmount } = useCreateBoxAmount();


  const addVaccineToBox = (vaccine: { idVaccines: number; nameVaccine: string }) => {
    // Evitar duplicados
    if (selectedVaccines.some((v) => v.id === vaccine.idVaccines)) return;
    setSelectedVaccines((prev) => [...prev, { id: vaccine.idVaccines, name: vaccine.nameVaccine }]);
  };

  const removeVaccineFromBox = (id: number) => {
    setSelectedVaccines((prev) => prev.filter((v) => v.id !== id));
  };

const CreateVaccinesBox = async () => {
  if (selectedVaccines.length === 0) {
    alert("Debes seleccionar al menos una vacuna");
    return;
  }

  try {
    // 1. Primero enviamos la cantidad de vacunas
    const amountData = {
      amountVaccines: selectedVaccines.length
    };

    // Suponiendo que tienes un hook useCreateBoxAmount para esto
    const createdAmount = await createBoxAmount(amountData);

    // 2. Luego enviamos los IDs de las vacunas
    if (createdAmount) {
      const boxData = {
        idVaccineBox: 0, // El backend asigna el ID
        idVaccines: selectedVaccines.map(v => v.id)
      };

      await createBox(boxData);
    }
    
    // Limpiar selección después de crear
    setSelectedVaccines([]);
    cerrarModal();
    alert("Caja de vacunas creada exitosamente!");
    
  } catch (error) {
    console.error("Error al crear caja de vacunas:", error);
    alert("Error al crear caja de vacunas");
  }
};


  return (
    <>
      <div className="fixed inset-0 bg-[#0000002b] backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white w-[50vh] sm:w-[86vh] rounded-lg shadow-xl p-6 pl-5 border-2 border-[#c0c0c0]">

          <div className="flex justify-between items-center mb-4 pr-4 pt-3">
            <p className="text-2xl font-semibold text-[#1f3445] ml-5">Configurar caja</p>
            <img
              src={x}
              alt="Cerrar"
              className="w-4 cursor-pointer opacity-70 hover:opacity-40 transition-opacity"
              onClick={cerrarModal}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end gap-4 w-full py-2">
          </div>

          {/* MOSTRAR VACUNAS AGREGADAS A LA CAJA */}
          {selectedVaccines.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedVaccines.map((vac) => (
                <div
                  key={vac.id}
                  className="flex items-center bg-[#f0f0f0] border border-gray-300 rounded-full px-3 py-1 text-sm"
                >
                  <span className="mr-2 text-gray-700">{vac.name}</span>
                  <img
                    src={x}
                    alt="Eliminar"
                    onClick={() => removeVaccineFromBox(vac.id)}
                    className="w-3 h-3 cursor-pointer opacity-60 hover:opacity-90"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="overflow-x-auto w-full  max-h-[30vh]">
            <table className="w-full border border-gray-300">
              <thead className="bg-[#F4F4F4] sticky top-0 z-10">
                <tr className="border-b border-gray-300">
                  <th className="px-6 py-3 text-left">Nombre</th>
                  <th className="px-6 py-3 text-center">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {vaccines.map((vaccine) => (
                  <tr key={vaccine.idVaccines} className="border-b border-gray-300">
                    <td className="px-6 py-3">{vaccine.nameVaccine}</td>
                    <td className="px-6 py-3">
                      <div className="flex justify-center items-center gap-6">
                        <img
                          src={add}
                          onClick={() => addVaccineToBox(vaccine)}
                          className="w-6 opacity-50 hover:opacity-75 cursor-pointer transition"
                          alt="Agregar a caja"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex justify-end mr-3">
            <p className="text-[#0000007d] font-medium">
              Cantidad de vacunas en caja: {selectedVaccines.length}
            </p>
          </div>

            <div className="w-full sm:w-full mt-6">
              <button
                className="bg-[#1677FF] text-white py-3 px-4 rounded w-full hover:bg-[#1677ffcc] transition disabled:opacity-50"
                onClick={CreateVaccinesBox}
                disabled={loadingBox || selectedVaccines.length === 0}
              >
                {loadingBox ? "Guardando..." : "Agregar"}
              </button>
            </div>
        </div>
      </div>
    </>
  );
}

export default ModalBrigadesVaccine;
