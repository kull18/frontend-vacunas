import x from "../../../../../../assets/x.png"
import edit from "../../../../../../assets/edit.png"
import deleted from "../../../../../../assets/delete.png"
import { useModalBrigadesVaccine } from "./ModalBrigadesVaccineContext";
function ModalBrigadesVaccine() {
    const {cerrarModal} = useModalBrigadesVaccine();
     const historial = [
  {
    id: 1,
    nombre: "ghhfgdhgf",
  },
  {
    id: 2,
    nombre: "Mffdhf",
  },
  {
    id: 3,
    nombre: "Lfhdhfh",
  },
  {
    id: 4,
    nombre: "Cchhhca",
  },
  {
    id: 5,
    nombre: "Jgxg",
  },
  {
    id: 6,
    nombre: "Dxgrgv",
  },
];
    return ( 
        <>
            <div className="fixed inset-0 bg-[#0000002b] backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white w-[50vh] sm:w-[86vh] rounded-lg shadow-xl p-6 pl-5 border-2 border-[#c0c0c0]">

        <div className="flex justify-between items-center mb-4 pr-4 pt-3">
        <p className="text-2xl font-semibold text-[#1f3445] ml-5">Agregar vacunas</p>
        <img
            src={x} 
            alt="Cerrar"
            className="w-4 cursor-pointer opacity-70 hover:opacity-40 transition-opacity"
            onClick={cerrarModal}
        />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-4 w-full py-2">
  <div className="w-full sm:w-[60vh]">
    <input
      id="nombre"
      type="text"
      className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
      placeholder="Nombre del paciente"
    />
  </div>

  <div className="w-full sm:w-[20vh]">
    <button className="bg-[#1677FF] text-white py-[1.9vh] px-4 rounded w-full hover:bg-[#1677ffcc] transition cursor-pointer">
      Agregar
    </button>
  </div>
</div>


        <div className="overflow-x-auto w-full mt-6 max-h-[30vh]">
            <table className="w-full border border-gray-300">
                <thead className="bg-[#F4F4F4] sticky top-0 z-10">
                    <tr className="border-b border-gray-300">
                    <th className="px-6 py-3 text-left">Nombre</th>
                    <th className="px-6 py-3 text-center">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {historial.map((historial) => (
                    <tr key={historial.id} className="border-b border-gray-300">
                        <td className="px-6 py-3">{historial.nombre}</td>
                        <td className="px-6 py-3">
                        <div className="flex justify-center items-center gap-6">
                            <img
                            src={edit}
                            className="w-6 opacity-50 hover:opacity-75 cursor-pointer transition"
                            alt="Editar"
                            />
                            <img
                            src={deleted}
                            className="w-6 opacity-50 hover:opacity-75 cursor-pointer transition"
                            alt="Eliminar"
                            />
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

        </div>
        
    </div>
</div>
        </>
    );
}

export default ModalBrigadesVaccine;