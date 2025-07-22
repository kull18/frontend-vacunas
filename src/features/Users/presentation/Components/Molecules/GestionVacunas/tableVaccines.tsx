import style from "../../Molecules/GestionVacunas/vaccines.module.css";
import edit from "../../../../../../assets/editIcon.png";
import deleteIcon from "../../../../../../assets/deletedIcon.png";
import { useState, useRef } from "react";
import { useModalVaccines } from "./ModalVaccineContext";
import { useGetVaccines } from "../../../../User/Presentation/Hooks/useGetVaccines";
import { useDeleteVaccine } from "../../../../User/Presentation/Hooks/useDeleteVaccine";
function TableVaccines() {
  const { abrirModal } = useModalVaccines();

  const { vaccines, loading } = useGetVaccines()

  const [pacientes, setPacientes] = useState([
    {
      id: 1,
      tipoVacuna: "Respiratoria",
      vacuna: "SARS-CoV-2",
      dosisAplicadas: 2,
    },
    {
      id: 2,
      tipoVacuna: "Gripe",
      vacuna: "Influenza Quadrivalente",
      dosisAplicadas: 1,
    },
    {
      id: 3,
      tipoVacuna: "Hepatitis",
      vacuna: "Hepatitis B Recombinante",
      dosisAplicadas: 3,
    },
    {
      id: 4,
      tipoVacuna: "Tétanos",
      vacuna: "Tdap",
      dosisAplicadas: 1,
    },
    {
      id: 5,
      tipoVacuna: "Neumocócica",
      vacuna: "PCV13",
      dosisAplicadas: 1,
    },
    {
      id: 6,
      tipoVacuna: "Respiratoria",
      vacuna: "SARS-CoV-2 Variante XBB",
      dosisAplicadas: 4,
    }
    // Puedes agregar o quitar pacientes para probar el comportamiento
  ]);

  const tableContainerRef = useRef(null);

    const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar esta vacuna?")) {
      try {
        const { remove } = useDeleteVaccine()
        await remove(id)
      } catch (error) {
        alert("Error al eliminar la vacuna");
        console.error(error);
      }
    }
  };

  return (
    <>
      <main>
        <div className="mt-10 ml-10">
          <p className="text-xl text-[#00000081] sm:text-2xl" id={style.title}>
            Control de inventario de vacunas
          </p>
        </div>

        {/* Contenedor principal de la tabla */}
        <div
          ref={tableContainerRef}
          className="border border-gray-300 rounded-lg overflow-x-auto w-[50vh] ml-10 mt-5 sm:w-[150vh] sm:overflow-hidden"
          style={{
            height: pacientes.length > 4 ? "250px" : "auto",
            display: "flex",
            flexDirection: "column"
          }}
          id={style.table}
        >
          {/* Cabecera fija */}
          <div className="flex-shrink-0 overflow-x-auto sm:overflow-auto">
            <table className="w-full">
              <thead className="bg-[#F4F4F4] overflow-auto w-32">
                <tr className="flex">
                  <th className="px-6 py-2 text-left flex-1 min-w-[200px]">Tipo de vacuna</th>
                  <th className="px-6 py-2 text-left flex-1 min-w-[200px]">Vacuna</th>
                  <th className="px-6 py-2 text-left flex-1 min-w-[200px]">Dosis aplicadas</th>
                  <th className="px-6 py-2 text-left flex-1 min-w-[200px]">Acciones</th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Cuerpo con scroll condicional */}
          <div
            style={{
              overflowY: pacientes.length > 4 ? "auto" : "visible",
              flexGrow: 1
            }}
          >
            <table className="w-full">
              <tbody>
                {vaccines.map((vacuna, index) => (
                  <tr key={index} className="flex border-b border-gray-300">
                    <td className="px-6 py-3  flex-1 min-w-[200px]">{vacuna.nameVaccine}</td>
                    <td className="px-6 py-3  flex-1 min-w-[200px]">{vacuna.nameVaccine}</td>
                    <td className="px-6 py-3  flex-1 min-w-[200px]">{vacuna.nameVaccine}</td>
                    <td className="px-6 py-3  flex-1 min-w-[200px]">
                      <div className="flex gap-2">
                        <button className="bg-[#F5C661] text-white px-2 py-1 rounded-lg flex items-center">
                          <img src={edit} alt="Editar" className="w-4 h-4 mr-1" />
                          Editar
                        </button>
                        <button onClick={() => {handleDelete(vacuna.idVaccines)}} className="bg-[#F82C2C] text-white px-2 py-1 rounded-lg flex items-center">
                          <img src={deleteIcon} alt="Eliminar" className="w-4 h-4 mr-1" />
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="ml-4 sm:ml-4 mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:pr-32">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2 w-full sm:w-auto">
            <div className="flex w-full sm:w-auto items-center" id={style.input}>
              <input
                type="text"
                placeholder="Buscar paciente"
                className="max-h-10 w-full sm:w-[50vh] px-3 py-2 border border-gray-300 text-gray-500 text-sm rounded-l-md focus:outline-none"
              />
              <button className="h-10 px-4 bg-[#1677FF] text-white text-sm rounded-r-md cursor-pointer
              hover:bg-[#1677ffd6] duration-200">
                Buscar
              </button>
            </div>

            <button className="bg-[#4CAF50] text-white px-4 py-2 rounded whitespace-nowrap cursor-pointer hover:bg-[#79cc7c] duration-200
            w-full sm:w-auto" 
            onClick={abrirModal}
            id={style.button}>
              Agregar nuevo paciente
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default TableVaccines;