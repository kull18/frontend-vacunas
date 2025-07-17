import { useRef, useState } from "react";
import style from "../PacientesRegistrados/patients.module.css";
import edit from "../../../../../../assets/editIcon.png";
import deleteIcon from "../../../../../../assets/deletedIcon.png";
import {useModal} from "../../Molecules/PacientesRegistrados/ModalContext"
function TablePatientsRegister() {
  const { abrirModal } = useModal();
  const [vacunas, setVacunas] = useState([
    {
      id: 1,
      nombre: "Lucía Ramírez Torres",
      edad: 32,
      horaRegistro: "08:15",
      resultado: "Negativo",
      vacunaAplicada: "Influenza Quadrivalente",
      dosis: 1,
    },
    {
      id: 2,
      nombre: "Marcos Téllez Guzmán",
      edad: 45,
      horaRegistro: "09:00",
      resultado: "Positivo",
      vacunaAplicada: "SARS-CoV-2 Variante XBB",
      dosis: 2,
    },
    {
      id: 3,
      nombre: "Daniela López Ortega",
      edad: 27,
      horaRegistro: "10:45",
      resultado: "Negativo",
      vacunaAplicada: "Hepatitis B Recombinante",
      dosis: 1,
    },
    {
      id: 4,
      nombre: "Sebastián Mendoza Ríos",
      edad: 61,
      horaRegistro: "11:30",
      resultado: "Positivo",
      vacunaAplicada: "PCV13",
      dosis: 1,
    },
    {
      id: 5,
      nombre: "Isabela Cruz Ruiz",
      edad: 39,
      horaRegistro: "12:10",
      resultado: "Negativo",
      vacunaAplicada: "Tdap",
      dosis: 1,
    },
    {
      id: 6,
      nombre: "Fernando Salgado Ponce",
      edad: 54,
      horaRegistro: "13:05",
      resultado: "Positivo",
      vacunaAplicada: "Influenza Quadrivalente",
      dosis: 2,
    },
  ]);

  const tableContainerRef = useRef(null);
  const setModal = () => {
  }

  return (
    <>
      <div className="">
        <div className="mt-10 ml-12">
          <p className="text-2xl text-[#00000081]" id={style.title1}>
            Tabla de pacientes registrados
          </p>
        </div>

        {/* Controles de búsqueda */}
        

        {/* Tabla optimizada */}
        <div
          ref={tableContainerRef}
          className="border border-gray-300 rounded-lg overflow-x-auto w-[90vw] mt-8
          ml-12 sm:w-[150vh] sm:overflow-x-hidden"
          style={{
            height: vacunas.length > 4 ? "250px" : "auto",
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
                  <th className="px-6 py-3 text-left w-[250px]">Paciente</th>
                  <th className="px-4 py-3 text-left w-[80px]">Edad</th>
                  <th className="px-4 py-3 text-left w-[100px]">Hora</th>
                  <th className="px-6 py-3 text-left w-[150px]">Resultado</th>
                  <th className="px-6 py-3 text-left w-[220px]">Vacuna</th>
                  <th className="px-4 py-3 text-left w-[80px]">Dosis</th>
                  <th className="px-6 py-3 text-left w-[200px]">Acciones</th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Cuerpo */}
          <div
            style={{
              overflowY: vacunas.length > 4 ? "auto" : "visible",
              flexGrow: 1,
            }}
          >
            <table className="w-full" id={style.table}>
              <tbody>
                {vacunas.map((v) => (
                  <tr key={v.id} className="flex border-b border-gray-300">
                    <td className="px-6 py-3 w-[250px] truncate">{v.nombre}</td>
                    <td className="px-4 py-3 w-[80px]">{v.edad}</td>
                    <td className="px-4 py-3 w-[100px]">{v.horaRegistro}</td>
                    <td className={`px-6 py-3 w-[150px] ${
                      v.resultado === "Positivo" ? "text-red-500" : "text-green-500"
                    }`}>
                      {v.resultado}
                    </td>
                    <td className="px-6 py-3 w-[220px] truncate">{v.vacunaAplicada}</td>
                    <td className="px-4 py-3 w-[80px]">{v.dosis}</td>
                    <td className="px-6 py-3 w-[200px]">
                      <div className="flex gap-2">
                        <button className="bg-[#F82C2C] text-white px-4 py-1 rounded-lg hover:bg-[#F82C2C]/90 duration-200 flex items-center gap-1 text-sm">
                          Negar vacuna
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="ml-4 sm:ml-12 mt-5 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:pr-32">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2 w-full sm:w-auto">
            <div className="flex w-full sm:w-auto items-center" id={style.input}>
              <input
                type="text"
                placeholder="Buscar paciente"
                className="max-h-10 w-[40px] sm:w-[50vh] px-3 py-0 border border-gray-300 text-gray-500 text-sm rounded-l-md focus:outline-none"
              />
              <button className="h-10 px-4 bg-[#1677FF] text-white text-sm rounded-r-md hover:bg-[#1677ffd6] duration-200 cursor-pointer">
                Buscar
              </button>
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
            Total: 6 pacientes
          </p>
        </div>
    </>
  );
}

export default TablePatientsRegister;