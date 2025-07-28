import style from "../../Molecules/GestionVacunas/vaccines.module.css";
import edit from "../../../../../../assets/editIcon.png";
import deleteIcon from "../../../../../../assets/deletedIcon.png";
import { useState, useRef, useEffect } from "react";
import { useModalVaccines } from "./ModalVaccineContext";
import { useGetVaccines } from "../../../../User/Presentation/Hooks/useGetVaccines";
import { useDeleteVaccine } from "../../../../User/Presentation/Hooks/useDeleteVaccine";
import { useAuth } from "../../../../User/Presentation/Hooks/AuthProvider";
import { useUpdateVaccine } from "../../../../User/Presentation/Hooks/useUpdateVaccine";
import type { Vaccine } from "../../../../User/Domain/Vaccine";
function TableVaccines() {
  const { abrirModal } = useModalVaccines();
  const { token } = useAuth()
  const { vaccines, setVaccines,  loading } = useGetVaccines()
  console.log("vaccines", vaccines)
    const { remove } = useDeleteVaccine()  
const [modalOpen, setModalOpen] = useState(false);
const [selectedVaccine, setSelectedVaccine] = useState<{ id: number; name: string } | null>(null);
  const { vaccines: newVaccineGet } = useGetVaccines()
  const tableContainerRef = useRef(null);

    const handleDelete = async (id: number) => {
      console.log("id",id)
    if (window.confirm("¿Estás seguro de eliminar esta vacuna?")) {
      try {

        const response =await remove(id)

      } catch (error) {
        alert("Error al eliminar la vacuna");
        console.error(error);
      }finally {
        console.log("se ha eliminado")
      }
    }
  };

  const seachVaccine = (vaccineName: string) => {
    try {
      if(vaccineName.length == 0) {

        setVaccines(newVaccineGet)
      }
      const filtredData = vaccines.filter((vaccine: Vaccine) => vaccine.nameVaccine === vaccineName)
      console.log("filtred", filtredData)

      if(filtredData.length > 0) setVaccines(filtredData)
    }catch(error) {
      throw error
    }
  }

  const handleEditClick = (vaccine: { idVaccines: number; nameVaccine: string }) => {
  setSelectedVaccine({ id: vaccine.idVaccines, name: vaccine.nameVaccine });
  setModalOpen(true);
}


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
            height: vaccines.length > 4 ? "250px" : "auto",
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
                  <th className="px-6 py-2 text-left flex-1 min-w-[200px]">Vacuna</th>
                  <th className="px-6 py-2 text-left flex-1 min-w-[200px]">Acciones</th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Cuerpo con scroll condicional */}
          <div
            style={{
              overflowY: vaccines.length > 4 ? "auto" : "visible",
              flexGrow: 1
            }}
          >
            <table className="w-full">
              <tbody>
                {vaccines.map((vacuna, index) => (
                  <tr key={index} className="flex border-b border-gray-300">
                    <td className="px-6 py-3  flex-1 min-w-[200px]">{vacuna.nameVaccine}</td>
                    <td className="px-6 py-3  flex-1 min-w-[200px]">
                      <div className="flex gap-2">
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
                onChange={(e) => {seachVaccine(e.target.value)}}
              />
            </div>

            <button className="bg-[#4CAF50] text-white px-4 py-2 rounded whitespace-nowrap cursor-pointer hover:bg-[#79cc7c] duration-200
            w-full sm:w-auto" 
            onClick={abrirModal}
            id={style.button}>
              Agregar nueva vacuna
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default TableVaccines;