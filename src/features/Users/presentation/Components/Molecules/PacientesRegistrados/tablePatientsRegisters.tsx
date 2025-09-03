import { useCallback, useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import style from "../PacientesRegistrados/patients.module.css";
import { useModal } from "../../Molecules/PacientesRegistrados/ModalContext";
import { useGetUserCivils } from "../../../../User/Presentation/Hooks/useGetUserCivils";
import type { UserCivil } from "../../../../User/Domain/UserCIvil";
import { ModalAgregarSeleccionarVacuna } from "./ModalAgregarVacunaSeleccionada";
import ModalPacientes from "./ModalPacientes";


function TablePatientsRegister() {
  const { abrirModal } = useModal();
  const { userCivils, setUserCivils, refetchUserCivils } = useGetUserCivils();
  const originalUserCivils = useRef<UserCivil[]>([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState<UserCivil | null>(null);
  const [mostrarModalVacuna, setMostrarModalVacuna] = useState(false);
  const [mostrarPacienteCivil, setMostrarModalPacienteCivil] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState("");

  console.log("civils", userCivils);

  // Actualizar la referencia original cuando cambien los datos
  useEffect(() => {
    originalUserCivils.current = [...userCivils];
    
    // Si hay un término de búsqueda activo, aplicar el filtro
    if (searchTerm.trim()) {
      searchUserCivil(searchTerm);
    }
  }, [userCivils]); // Removed searchUserCivil from dependencies to avoid infinite loop

  const searchUserCivil = useCallback(
    (userCivilName: string) => {
      try {
        const searchValue = userCivilName.trim().toLowerCase();
        setSearchTerm(searchValue);

        if (searchValue.length === 0) {
          setUserCivils([...originalUserCivils.current]);
        } else {
          const filtered = originalUserCivils.current.filter((user: UserCivil) =>
            `${user.name} ${user.firstLastname}`.toLowerCase().includes(searchValue)
          );
          setUserCivils(filtered);
        }
      } catch (error) {
        console.error("Error al buscar paciente:", error);
      }
    },
    [setUserCivils]
  );

  // Función mejorada para manejar el cierre del modal
  const handleCloseModal = useCallback(() => {
    setMostrarModalVacuna(false);
    setPacienteSeleccionado(null);
  }, []);

  // Función para manejar la actualización después de agregar vacuna
  const handleRefetchAfterVaccination = useCallback(async () => {
    try {
      await refetchUserCivils();
      // Aplicar filtro de búsqueda si existe
      if (searchTerm.trim()) {
        // Pequeño delay para asegurar que los datos se actualicen
        setTimeout(() => {
          searchUserCivil(searchTerm);
        }, 100);
      }
    } catch (error) {
      console.error("Error al refrescar datos:", error);
    }
  }, [refetchUserCivils, searchTerm, searchUserCivil]);

  return (
    <>
      <div className="">
        <div className="mt-10 ml-12">
          <p className="text-2xl text-[#00000081]" id={style.title1}>
            Tabla de pacientes registrados
          </p>
        </div>

        {/* Tabla */}
        <div
          className="border border-gray-300 rounded-lg overflow-x-auto w-[90vw] mt-8 ml-12 sm:w-[150vh] sm:overflow-x-hidden"
          style={{
            height: userCivils.length > 4 ? "250px" : "auto",
            display: "flex",
            flexDirection: "column",
          }}
          id={style.table}
        >
          {/* Cabecera */}
          <div className="flex-shrink-0 overflow-x-auto sm:overflow-auto">
            <table className="w-full" id={style.table}>
              <thead className="bg-[#F4F4F4]">
                <tr className="flex">
                  <th className="px-6 py-3 text-left w-[250px]">Nombre completo</th>
                  <th className="px-6 py-3 text-left w-[150px]">Folio</th>
                  <th className="px-4 py-3 text-left w-[170px]">Resultado de alcoholemia</th>
                  <th className="px-4 py-3 text-left w-[130px]">Temperatura corporal</th>
                  <th className="px-4 py-3 text-left w-[130px]">Vacuna aplicada</th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Cuerpo */}
          <div
            style={{
              overflowY: userCivils.length > 4 ? "auto" : "visible",
              maxHeight: "300px",
              flexGrow: 1,
            }}
          >
            <table className="w-full" id={style.table}>
              <tbody>
                {userCivils.map((v: UserCivil, index) => (
                  <tr key={`${v.idUserCivil}-${v.isVaccinated}`} className="flex border-b border-gray-300">
                    <td className="px-6 py-3 w-[250px] truncate">
                      {v.name} {v.firstLastname}
                    </td>
                    <td className="px-6 py-3 w-[150px] truncate">
                      {v.fol}
                    </td>
                    <td
                      className={`px-4 py-3 w-[170px] truncate font-bold ${
                        v.alcoholBreat > 0.9 ? "text-red-500" : "text-green-600"
                      }`}
                    >
                      {v.alcoholBreat > 0.9 ? "POSITIVO" : "NEGATIVO"}
                    </td>

                    <td className="px-4 py-3 w-[130px]">
                      {v.corporalTemperature}
                    </td>

                    <td className="px-4 py-3 w-[160px]">
                      {v.isVaccinated === 1 ? (
                        <span className="text-green-600 font-semibold">Ya ha sido asignado</span>
                      ) : (
                        <button
                          className="bg-orange-400 text-white px-3 py-1 rounded hover:bg-orange-500 transition-colors"
                          onClick={() => {
                            setPacienteSeleccionado(v);
                            setMostrarModalVacuna(true);
                          }}
                        >
                          Agregar vacuna
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="ml-4 sm:ml-12 mt-5 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:pr-32">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2 w-full sm:w-auto">
          <div className="flex w-full sm:w-auto items-center" id={style.input}>
            <input
              type="text"
              placeholder="Buscar paciente"
              className="max-h-10 w-[40px] sm:w-[50vh] px-3 py-0 border border-gray-300 text-gray-500 text-sm rounded-l-md focus:outline-none"
              onChange={(e) => searchUserCivil(e.target.value)}
              value={searchTerm}
            />
          </div>

          <button
            className="bg-[#4CAF50] text-white px-4 py-2 rounded whitespace-nowrap w-[50vh] sm:w-auto cursor-pointer hover:bg-[#79cc7c] duration-200"
            id={style.button}
            onClick={() => {
              setMostrarModalPacienteCivil(true)
            }}
          >
            Agregar Nuevo paciente
          </button>
        </div>

        <p
          className="text-[#000000a7] font-bold text-sm sm:text-base text-center sm:text-right"
          id={style.paciente}
        >
          Total: {userCivils.length} pacientes
        </p>
      </div>

      {mostrarModalVacuna && pacienteSeleccionado && (
        <ModalAgregarSeleccionarVacuna
          paciente={pacienteSeleccionado} 
          onClose={handleCloseModal}
          refetchUserCivils={handleRefetchAfterVaccination}
        />
      )}


      {mostrarPacienteCivil && (
        <ModalPacientes 
        refetch={handleRefetchAfterVaccination}
        />
      )}
    </>
  );
}

export default TablePatientsRegister;