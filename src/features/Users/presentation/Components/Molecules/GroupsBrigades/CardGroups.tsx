import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../Molecules/RegistroBrigadasVacunacion/brigades.module.css"
import { useGetGroup } from "../../../../Group/Presentation/Hooks/useGetGroups";
import { GroupRepository } from "../../../../Group/Domain/GroupRepository";
import { useDeleteGroup } from "../../../../Group/Presentation/Hooks/useDeleteGroup";
import Swal from "sweetalert2";
import EditGroupModal from "./EditGroupModal"; // Importa el modal

function CardGroups() {
    const navigate = useNavigate();
    const { group, loadingGroup, errorGroup, refetch } = useGetGroup();
    const repository = new GroupRepository();
    const { deleteGroup, isDeleting, error } = useDeleteGroup(repository);
    
    // Estado para el modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<any>(null);

    const addBrigade = () => {
        navigate("/dashboard/grupo/registrar/administrador")
    }

    const handleDelete = async (groupId: number, groupName: string) => {
        const result = await Swal.fire({
            title: `¿Eliminar grupo ${groupName}?`,
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            const success = await deleteGroup(groupId);
            
            if (success) {
                await Swal.fire(
                    '¡Eliminado!',
                    `El grupo ${groupName} ha sido eliminado.`,
                    'success'
                );
                refetch();
            } else {
                await Swal.fire(
                    'Error',
                    error || 'No se pudo eliminar el grupo',
                    'error'
                );
            }
        }
    };

    // Función para abrir el modal de edición
    const handleEdit = (groupData: any) => {
        setSelectedGroup(groupData);
        setIsModalOpen(true);
    };

    // Función para guardar los cambios (aquí debes implementar tu lógica de actualización)
    const handleSaveEdit = async (groupId: number, updatedData: any) => {
        try {
            // Aquí debes llamar a tu servicio de actualización
            // const success = await repository.updateGroup(groupId, updatedData);
            
            // Por ahora simulamos éxito
            refetch(); // Refrescar la lista
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    return ( 
        <>
            <div className="mt-10 mx-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pr-5 pl-5">
                <p className="text-2xl text-[#00000081] font-semibold">
                    Grupos
                </p>

                <button
                    onClick={addBrigade}
                    className="bg-[#089ea1] text-white py-3 px-7 rounded-lg hover:bg-[#0dbfbe] transition-all duration-300 cursor-pointer w-full sm:w-auto shadow-sm hover:shadow-md font-medium"
                >
                    Agregar grupo
                </button>
            </div>

            <main className="mt-8 px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                {group.map((group, index) => (
                    <div 
                        key={index} 
                        className="relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 overflow-visible group"
                    >
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-br from-violet-400 to-violet-500 h-7 w-7 rounded-full shadow-md"></div>

                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-50 to-transparent rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-70 transition-opacity"></div>

                        <div className="relative">
                            <div className="mb-5 mt-2">
                                <h3 className="text-xl font-bold text-gray-800 mb-1">
                                    {group.nameGroup}
                                </h3>
                                <div className="w-12 h-1 bg-gradient-to-r from-violet-400 to-violet-200 rounded-full"></div>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100">
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5 text-violet-600" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 font-semibold text-sm">
                                        {group.dateGroup}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button 
                                    onClick={() => handleEdit(group)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 hover:from-amber-100 hover:to-orange-100 border border-amber-200 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl font-medium group/btn"
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-4 w-4 group-hover/btn:scale-110 transition-transform" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                                        />
                                    </svg>
                                    <span className="text-sm">Editar</span>
                                </button>

                                <button 
                                    onClick={() => {
                                        if (typeof group.idGroup === 'number') {
                                            handleDelete(group.idGroup, group.nameGroup);
                                        }
                                    }}
                                    disabled={isDeleting}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-50 to-red-50 text-rose-700 hover:from-rose-100 hover:to-red-100 border border-rose-200 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-4 w-4 group-hover/btn:scale-110 transition-transform" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                                        />
                                    </svg>
                                    <span className="text-sm">
                                        {isDeleting ? 'Eliminando...' : 'Eliminar'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}


            {/* Modal de edición */}
            <EditGroupModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                groupData={selectedGroup}
                onSave={handleSaveEdit}
            />                
            </main>


        </>
    );
}

export default CardGroups;