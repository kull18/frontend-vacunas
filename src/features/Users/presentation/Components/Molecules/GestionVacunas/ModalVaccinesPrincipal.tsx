import x from "../../../../../../assets/x.png";
import edit from "../../../../../../assets/edit.png";
import deleted from "../../../../../../assets/delete.png";
import { useState } from "react";
import { useModalVaccinesPrincipal } from "./ModalVaccinesPrincipalContext";
import { useGetVaccines } from "../../../../User/Presentation/Hooks/useGetVaccines";
import { useCreateVaccine } from "../../../../User/Presentation/Hooks/useCreateVaccine";
import { useUpdateVaccine } from "../../../../User/Presentation/Hooks/useUpdateVaccine"; // Asegúrate de crear este hook
import type { Vaccine } from "../../../../User/Domain/Vaccine";
import Swal from "sweetalert2";
import { useDeleteVaccine } from "../../../../User/Presentation/Hooks/useDeleteVaccine";
function ModalVaccinePrincipal() {
    const { vaccines, loading, refetch } = useGetVaccines();
    const { cerrarModal } = useModalVaccinesPrincipal();
    const [nameVaccine, setNameVaccine] = useState<string>("");
    const { createVaccine, loading: creatingVaccine, error: createError } = useCreateVaccine();
    const { updateVaccine, loading: updatingVaccine, error: updateError } = useUpdateVaccine();
    const { remove, loadingDelete: deleting } = useDeleteVaccine();
    // Estado para el modo edición
    const [editingVaccine, setEditingVaccine] = useState<Vaccine | null>(null);

    // En ModalVaccinePrincipal.tsx
const handleDelete = async (id: number) => {
  try {
    const success = await remove(id);
    if (success) {
      await refetch(); // Refresca la lista desde el backend
      Swal.fire('¡Eliminado!', 'La vacuna ha sido eliminada.', 'success');
    }
  } catch (error) {
    Swal.fire('Error', 'No se pudo eliminar la vacuna', 'error');
    console.error("Error al eliminar:", error);
  }
};

    const handleCreateVaccine = async () => {
        if (!nameVaccine.trim()) {
            alert("Por favor ingrese un nombre para la vacuna");
            return;
        }

        try {
            if (editingVaccine) {
                // Modo actualización
                await updateVaccine(editingVaccine.idVaccines, { nameVaccine });
                Swal.fire("Vacuna actualizada correctamente");
            } else {
                // Modo creación
                await createVaccine({ nameVaccine });
                Swal.fire("Vacuna agregada correctamente");
            }
            setNameVaccine("");
            setEditingVaccine(null);
            await refetch();
        } catch (err) {
            console.error("Error al guardar vacuna:", err);
        }
    };

    const handleEdit = (vaccine: Vaccine) => {
        setNameVaccine(vaccine.nameVaccine);
        setEditingVaccine(vaccine);
    };

    const cancelEdit = () => {
        setNameVaccine("");
        setEditingVaccine(null);
    };

    return ( 
        <>
            <div className="fixed inset-0 bg-[#0000002b] backdrop-blur-sm flex justify-center items-center">
                <div className="bg-white w-[50vh] sm:w-[86vh] rounded-lg shadow-xl p-6 pl-5 border-2 border-[#c0c0c0]">

                    {/* Encabezado */}
                    <div className="flex justify-between items-center mb-4 pr-4 pt-3">
                        <p className="text-2xl font-semibold text-[#1f3445] ml-5">Agregar vacunas al inventario</p>
                        <img
                            src={x} 
                            alt="Cerrar"
                            className="w-4 cursor-pointer opacity-70 hover:opacity-40 transition-opacity"
                            onClick={cerrarModal}
                        />
                    </div>

                    {/* Mensajes de error */}
                    {(createError || updateError) && (
                        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                            Error
                        </div>
                    )}

                    {/* Formulario */}
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

                        <div className="w-full sm:w-[20vh] flex gap-2">
                            <button 
                                onClick={handleCreateVaccine}
                                disabled={creatingVaccine || updatingVaccine}
                                className={`${
                                    editingVaccine 
                                        ? "bg-amber-500 hover:bg-amber-600" 
                                        : "bg-[#1677FF] hover:bg-[#1677ffcc]"
                                } text-white py-[1.9vh] px-4 rounded w-full transition cursor-pointer`}
                            >
                                {creatingVaccine || updatingVaccine 
                                    ? "Guardando..." 
                                    : editingVaccine 
                                        ? "Actualizar" 
                                        : "Agregar"}
                            </button>
                            
                        </div>
                            {editingVaccine && (
                                <button 
                                    onClick={cancelEdit}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-4 px-2 rounded transition cursor-pointer text-sm"
                                >
                                    Cancelar
                                </button>
                            )}
                    </div>

                    {/* Tabla de vacunas */}
                    <div className="overflow-x-auto w-full mt-6 max-h-[30vh]">
                        <table className="w-full border border-gray-300">
                            <thead className="bg-[#F4F4F4] sticky top-0 z-10">
                                <tr className="border-b border-gray-300">
                                    <th className="px-6 py-3 text-left">Nombre</th>
                                    <th className="px-6 py-3 text-center">Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {vaccines.map((vacuna) => (
                                    <tr key={vacuna.idVaccines} className="border-b border-gray-300">
                                        <td className="px-6 py-3">{vacuna.nameVaccine}</td>
                                        <td className="px-6 py-3">
                                            <div className="flex justify-center items-center gap-6">
                                                <img
                                                    src={edit}
                                                    className="w-6 opacity-50 hover:opacity-75 cursor-pointer transition"
                                                    alt="Editar"
                                                    onClick={() => handleEdit(vacuna)}
                                                    title="Editar"
                                                />
                                                <img
                                                  src={deleted}
                                                  className="w-6 opacity-50 hover:opacity-75 cursor-pointer transition"
                                                  alt="Eliminar"
                                                  title="Eliminar"
                                                  onClick={() => handleDelete(vacuna.idVaccines)}
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