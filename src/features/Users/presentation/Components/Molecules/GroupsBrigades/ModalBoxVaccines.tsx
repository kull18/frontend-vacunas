import add from "../../../../../../assets/add.png"
import x from "../../../../../../assets/x.png"
import { useModalBoxs } from "./ModalBoxVaccinesContext"
import { useGetVaccines } from "../../../../User/Presentation/Hooks/useGetVaccines";
function ModalBoxVaccunes() {
    const {cerrarModal} = useModalBoxs();
    const { vaccines, loading } = useGetVaccines();
    const boxs = [
  {
    id: 1,
    nombre: "Caja de alzeime",
  },
  {
    id: 2,
    nombre: "Caja de SIDA",
  },
  {
    id: 3,
    nombre: "Caja de alzeime",
  },
  {
    id: 4,
    nombre: "Caja de SIDA",
  },
  {
    id: 5,
    nombre: "Caja de alzeime",
  },
  {
    id: 6,
    nombre: "Caja de SIDA",
  },
    ]
    return ( 
        <>
                    <div className="fixed inset-0 bg-[#0000002b] backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white w-[50vh] sm:w-[86vh] rounded-lg shadow-xl p-6 pl-5 border-2 border-[#c0c0c0]">

        <div className="flex justify-between items-center mb-4 pr-4 pt-3">
        <p className="text-2xl font-semibold text-[#1f3445] ml-5">Agregar caja de vacunas</p>
        <img
            src={x} 
            alt="Cerrar"
            className="w-4 cursor-pointer opacity-70 hover:opacity-40 transition-opacity"
            onClick={cerrarModal}
        />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-4 w-full py-2">

</div>


        <div className="overflow-x-auto w-full  max-h-[30vh]">
            <table className="w-full border border-gray-300">
                <thead className="bg-[#F4F4F4] sticky top-0 z-10">
                    <tr className="border-b border-gray-300">
                    <th className="px-6 py-3 text-left">Nombre</th>
                    <th className="px-6 py-3 text-center">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {boxs.map((historial) => (
                    <tr key={historial.id} className="border-b border-gray-300">
                        <td className="px-6 py-3">{historial.nombre}</td>
                        <td className="px-6 py-3">
                        <div className="flex justify-center items-center gap-6">
                            <img
                            src={add}
                            className="w-6 opacity-50 hover:opacity-75 cursor-pointer transition"
                            alt="Editar"
                            />
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="mt-8 flex justify-end mr-3">
              <p className="text-[#0000007d] font-medium">Cantidad de vacunas</p>
        </div>
        
    </div>
</div>
        </>
     );
}

export default ModalBoxVaccunes;