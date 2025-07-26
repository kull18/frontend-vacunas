import { useCallback, useRef, useEffect } from "react";
import style from "../PacientesRegistrados/patients.module.css";
import edit from "../../../../../../assets/editIcon.png";
import deleteIcon from "../../../../../../assets/deletedIcon.png";
import { useModal } from "../../Molecules/PacientesRegistrados/ModalContext";
import { useGetUserCivils } from "../../../../User/Presentation/Hooks/useGetUserCivils";
import type { UserCivil } from "../../../../User/Domain/UserCIvil";

function TablePatientsRegister() {
  const { abrirModal } = useModal();
  const { userCivils, setUserCivils } = useGetUserCivils();
  const originalUserCivils = useRef<UserCivil[]>([]);

  useEffect(() => {
    if (originalUserCivils.current.length === 0 && userCivils.length > 0) {
      originalUserCivils.current = [...userCivils];
    }
  }, [userCivils]);

  const searchUserCivil = useCallback((userCivilName: string) => {
    try {
      const searchValue = userCivilName.trim().toLowerCase();

      if (searchValue.length === 0) {
        setUserCivils([...originalUserCivils.current]);
      } else {
        const filtered = originalUserCivils.current.filter((user: UserCivil) =>
          `${user.name} ${user.lastname}`.toLowerCase().includes(searchValue)
        );
        setUserCivils(filtered);
      }
    } catch (error) {
      console.error("Error al buscar paciente:", error);
    }
  }, [setUserCivils]);

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
                  <th className="px-6 py-3 text-left w-[80px]">Folio</th>
                  <th className="px-4 py-3 text-left w-[100px]">Temperatura Corporal</th>
                  <th className="px-4 py-3 text-left w-[120px]">Aliento alcohólico</th>
                  <th className="px-4 py-3 text-left w-[80px]">Vacunado</th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Cuerpo */}
          <div
            style={{
              overflowY: userCivils.length > 4 ? "auto" : "visible",
              flexGrow: 1,
            }}
          >
            <table className="w-full" id={style.table}>
              <tbody>
                {userCivils.map((v, index) => (
                  <tr key={index} className="flex border-b border-gray-300">
                    <td className="px-6 py-3 w-[250px] truncate">
                      {v.name} {v.lastname}
                    </td>
                    <td className="px-6 py-3 w-[80px]">{v.fol}</td>
                    <td className="px-4 py-3 w-[100px]">{v.corporalTemperature}</td>
                    <td className="px-4 py-3 w-[120px] truncate">{v.alcoholBreat}</td>
                    <td className="px-4 py-3 w-[80px]">{v.isVaccinated === 1 ? "Sí" : "No"}</td>
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
            />
          </div>

          <button
            className="bg-[#4CAF50] text-white px-4 py-2 rounded whitespace-nowrap w-[50vh] sm:w-auto cursor-pointer hover:bg-[#79cc7c] duration-200"
            id={style.button}
            onClick={abrirModal}
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
    </>
  );
}

export default TablePatientsRegister;
