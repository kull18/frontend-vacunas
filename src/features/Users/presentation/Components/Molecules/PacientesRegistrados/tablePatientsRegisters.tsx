import style from "../PacientesRegistrados/patients.module.css"
function TablePatientsRegister() {
    return ( 
        <>
        <div className="">
            <div className="mt-10 ml-12">
                <p className="text-2xl text-[#00000081]" id={style.title1}>Tabla de pacientes registrados</p>
            </div>

            <div className="overflow-x-auto max-w-full mt-8 ml-4 sm:ml-12 mr-4 sm:mr-1" id={style.tablet}>
            <table className="min-w-[150vh] border border-gray-300">
            <thead className="bg-[#F4F4F4]">
                <tr className="border-b border-gray-300">
                <th className="px-6 py-3 text-left">Nombre</th>
                <th className="px-6 py-3 text-left">Edad</th>
                <th className="px-6 py-3 text-left">Hora de registro</th>
                <th className="px-6 py-3 text-left">Resultado de alcoholemia</th>
                <th className="px-6 py-3 text-left">Vacuna aplicada</th>
                <th className="px-6 py-3 w-[180px] text-left">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b border-gray-300">
                <td className="px-6 py-3">Hector Emilio Somer</td>
                <td className="px-6 py-3">10</td>
                <td className="px-6 py-3">10:30 AM</td>
                <td className="px-6 py-3">Positivo</td>
                <td className="px-6 py-3">INFLUENZA</td>
                <td className="px-6 py-3">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-red-400 duration-200">Negar vacuna</button>
                </td>
                </tr>
                <tr className="border-b border-gray-300">
                <td className="px-6 py-3">Sergio Adrian Montoya</td>
                <td className="px-6 py-3">4</td>
                <td className="px-6 py-3">01:34 PM</td>
                <td className="px-6 py-3">Positivo</td>
                <td className="px-6 py-3">COVID</td>
                <td className="px-6 py-3">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-red-400 duration-200">Negar vacuna</button>
                </td>
                </tr>
                <tr className="border-b border-gray-300">
                <td className="px-6 py-3">David Guzman Castro</td>
                <td className="px-6 py-3">22</td>
                <td className="px-6 py-3">03:30 PM</td>
                <td className="px-6 py-3">Negativo</td>
                <td className="px-6 py-3">PROSASO</td>
                <td className="px-6 py-3">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-red-400 duration-200">Negar vacuna</button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>

        
<div className="ml-4 sm:ml-6 mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:pr-32">
  {/* Izquierda: Input + Botones */}
  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2 w-full sm:w-auto">
    <div className="flex w-full sm:w-auto items-center" id={style.input}>
      <input type="text" placeholder="Buscar paciente" className="max-h-10 w-[40px] sm:w-[50vh] px-3 py-0 border border-gray-300 text-gray-500 text-sm rounded-l-md focus:outline-none" />
      <button
        className="h-10 px-4 bg-[#1677FF] text-white text-sm rounded-r-md hover:bg-[#1677ffd6] duration-200"
      >
        Search
      </button>
    </div>

    <button className="bg-[#4CAF50] text-white px-4 py-2 rounded whitespace-nowrap w-[50vh] sm:w-auto" id={style.button}>
      Agregar nuevo paciente
    </button>
  </div>

  {/* Derecha: Conteo de pacientes */}
  <p className="text-[#000000a7] font-bold text-sm sm:text-base text-center sm:text-right" id={style.paciente}>
    Pacientes registrados: 100
  </p>
</div>


    </div>
        </>
     );
}

export default TablePatientsRegister;