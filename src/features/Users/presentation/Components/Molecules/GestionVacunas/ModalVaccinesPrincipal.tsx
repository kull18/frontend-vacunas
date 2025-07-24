import x from "../../../../../../assets/x.png"
import edit from "../../../../../../assets/edit.png"
import deleted from "../../../../../../assets/delete.png"
import { useState } from "react";
import { useModalVaccinesPrincipal } from "./ModalVaccinesPrincipalContext";
import { useGetVaccines } from "../../../../User/Presentation/Hooks/useGetVaccines";
import { useCreateVaccine } from "../../../../User/Presentation/Hooks/useCreateVaccine";
function ModalVaccinePrincipal() {
    const { vaccines, loading } = useGetVaccines();
    const {cerrarModal} = useModalVaccinesPrincipal();
    const [nameVaccine, setNameVaccine] = useState<string>("");
    const { createVaccine, loadingVaccine, error, createdVaccine } = useCreateVaccine();
    console.log("vacunas en el front", vaccines)
const handleCreateVaccine = async () => {
  try {
    console.log("Datos a enviar:", { nameVaccine });
    
    // Espera explícitamente por el resultado
    const result = await createVaccine({ nameVaccine });
    
    // TypeScript ahora sabe que result es VaccineName
    console.log("Respuesta del backend:", result);
    
    setNameVaccine("");
    console.log("Vacuna agregada correctamente");
    
  } catch (error) {
    console.error("Error completo:", error);
    alert("Error al agregar vacuna");
  }
};

    return ( 
        <>
            <div className="fixed inset-0 bg-[#0000002b] backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white w-[50vh] sm:w-[86vh] rounded-lg shadow-xl p-6 pl-5 border-2 border-[#c0c0c0]">

        <div className="flex justify-between items-center mb-4 pr-4 pt-3">
        <p className="text-2xl font-semibold text-[#1f3445] ml-5">Agregar vacunas al inventario</p>
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
      value={nameVaccine}
        onChange={(e) => setNameVaccine(e.target.value)}
      className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
      placeholder="Nombre de la vacuna"
    />
  </div>

  <div className="w-full sm:w-[20vh]">
    <button 
    onClick={handleCreateVaccine}
    className="bg-[#1677FF] text-white py-[1.9vh] px-4 rounded w-full hover:bg-[#1677ffcc] transition cursor-pointer">
      {loadingVaccine ? "Agregando..." : "Agregar"}
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
                    {vaccines.map((historial) => (
                    <tr key={historial.idVaccines} className="border-b border-gray-300">
                        <td className="px-6 py-3">{historial.nameVaccine}</td>
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
        <div className="mt-5 flex justify-end mr-3">
              <p className="text-[#0000007d] font-medium">Cantidad de vacunas: {vaccines.length}</p>
        </div>
        
    </div>
</div>
        </>
    );
}

export default ModalVaccinePrincipal;