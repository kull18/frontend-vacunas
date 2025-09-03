import { useState } from "react";
import type { UserCivilVaccinated } from "../../../../User/Domain/UserCivilVaccinated";
import { useCreateUserCivilVaccinated } from "../../../../User/Presentation/Hooks/useCreateUserCivilVaccinated";
import { useGetVaccines } from "../../../../User/Presentation/Hooks/useGetVaccines";
import { useLoginUser } from "../../../../User/Presentation/Hooks/useLoginUsers";
import { useUpdateIsVaccinated } from "../../../../User/Presentation/Hooks/useUpdateIsVaccinated";
import type { UserCivil } from "../../../../User/Domain/UserCIvil";
import type { Vaccine } from "../../../../User/Domain/Vaccine";
import { createPortal } from "react-dom";

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return createPortal(
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999999
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

function ModalAgregarSeleccionarVacuna({
  paciente,
  onClose,
  refetchUserCivils,
}: {
  paciente: UserCivil;
  onClose: () => void;
  refetchUserCivils: () => void;
}) {
  const [selectedVaccineId, setSelectedVaccineId] = useState<number | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const { vaccines } = useGetVaccines();
  const { loggedUser } = useLoginUser();
  const { createUserCivilVaccinated } = useCreateUserCivilVaccinated();
  const { execute } = useUpdateIsVaccinated();

  const handleGuardar = async () => {
    if (!loggedUser || selectedVaccineId === "" || isLoading) return;

    try {
      setIsLoading(true);

      const userCivilVaccinated: UserCivilVaccinated = {
        UserCivil_idUserCivil: paciente.idUserCivil,
        UserCivil_UserMedicVaccined: loggedUser.idUser,
        Vaccine_idVaccines: Number(selectedVaccineId),
        date: new Date().toISOString(),
      };

      // Ejecutar las operaciones secuencialmente
      await createUserCivilVaccinated(userCivilVaccinated);
      await execute(paciente.idUserCivil);
      
      // Forzar la actualización de los datos
      await refetchUserCivils();
      
      // Cerrar el modal después de todas las operaciones
      onClose();
    } catch (error) {
      console.error("Error al guardar la vacuna:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-4 bg-white rounded shadow-md max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Agregar vacuna a {paciente.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <select
          value={selectedVaccineId}
          onChange={(e) => setSelectedVaccineId(Number(e.target.value))}
          className="border px-2 py-1 w-full mb-2"
          disabled={isLoading}
        >
          <option value="">Seleccionar vacuna</option>
          {vaccines.map((vaccine: Vaccine) => (
            <option key={vaccine.idVaccines} value={vaccine.idVaccines}>
              {vaccine.nameVaccine}
            </option>
          ))}
        </select>

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            disabled={isLoading || selectedVaccineId === ""}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export { ModalAgregarSeleccionarVacuna}