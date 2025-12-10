import { useState, useTransition, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useGetGroup } from "../../../../Group/Presentation/Hooks/useGetGroups";
import { GroupRepository } from "../../../../Group/Domain/GroupRepository";
import { useDeleteGroup } from "../../../../Group/Presentation/Hooks/useDeleteGroup";
import type { Group } from "../../../../Group/Domain/Group";
import EditGroupModal from "./EditGroupModal";

// ✅ COMPONENTE DE CONFIRMACIÓN DE ELIMINACIÓN CON PORTAL
interface DeleteGroupConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  groupName: string;
}

function DeleteGroupConfirmationModal({ isOpen, onConfirm, onCancel, groupName }: DeleteGroupConfirmationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        onClick={onCancel}
      ></div>

      {/* Modal centrado */}
      <div 
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-lg px-4"
        style={{ position: 'fixed' }}
      >
        <div className="bg-white rounded-2xl shadow-2xl animate-in zoom-in fade-in duration-200">
          {/* Header rojo */}
          <div className="bg-red-600 px-6 py-4 flex justify-between items-center rounded-t-2xl">
            <div>
              <h2 className="text-xl font-bold text-white">Eliminar Grupo</h2>
              <p className="text-sm text-red-100 mt-1">Esta acción no se puede deshacer</p>
            </div>
            <button
              onClick={onCancel}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Contenido */}
          <div className="p-6">
            {/* Icono de advertencia */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>

            {/* Información del grupo */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 justify-center">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-sm text-gray-700">
                  Grupo:{' '}
                  <span className="font-bold text-red-700">{groupName}</span>
                </p>
              </div>
            </div>

            <p className="text-center text-gray-600 text-sm mb-6">
              Se eliminarán todos los miembros y la información asociada a este grupo permanentemente.
            </p>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors shadow-lg"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

// Loading Skeleton Component
function GroupsLoadingSkeleton() {
    return (
        <>
            <div className="mt-10 mx-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pr-5 pl-5">
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            <main className="mt-8 px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
                        <div className="h-12 bg-gray-100 rounded-xl animate-pulse mb-4"></div>
                        <div className="flex gap-3">
                            <div className="flex-1 h-10 bg-gray-100 rounded-xl animate-pulse"></div>
                            <div className="flex-1 h-10 bg-gray-100 rounded-xl animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </main>
        </>
    );
}

// Main Component
function CardGroups() {
    const navigate = useNavigate();
    const { group, loadingGroup, errorGroup, refetch } = useGetGroup();
    const repository = new GroupRepository();
    const { deleteGroup, isDeleting, error } = useDeleteGroup(repository);
    
    const [isPending, startTransition] = useTransition();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

    // ✅ Estados para el modal de confirmación de eliminación
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [groupToDelete, setGroupToDelete] = useState<{id: number, name: string} | null>(null);

    // Memoizar los grupos para evitar re-renders innecesarios
    const memoizedGroups = useMemo(() => group || [], [group]);

    const addBrigade = () => {
        navigate("/dashboard/grupo/registrar/administrador");
    };

    // ✅ Función para mostrar modal de confirmación
    const handleDeleteClick = (groupId: number, groupName: string) => {
        setGroupToDelete({ id: groupId, name: groupName });
        setShowDeleteConfirm(true);
    };

    // ✅ Función para cancelar eliminación
    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
        setGroupToDelete(null);
    };

    // ✅ Función para confirmar eliminación
    const handleConfirmDelete = async () => {
        if (!groupToDelete) return;

        setShowDeleteConfirm(false);

        // Toast de carga
        const loadingToast = toast.loading('Eliminando grupo...', {
            style: {
                borderRadius: '12px',
                background: '#333',
                color: '#fff',
                padding: '16px',
            },
        });

        try {
            const success = await deleteGroup(groupToDelete.id);
            
            if (success) {
                // Toast de éxito
                toast.success(
                    <div>
                        <strong className="block mb-1">¡Grupo eliminado!</strong>
                        <p className="text-sm opacity-90">
                            El grupo "{groupToDelete.name}" ha sido eliminado
                        </p>
                    </div>,
                    {
                        id: loadingToast,
                        duration: 4000,
                        icon: '🗑️',
                        style: {
                            borderRadius: '12px',
                            background: '#10b981',
                            color: '#fff',
                            padding: '16px',
                        },
                    }
                );
                
                // Usar transición para el refetch
                startTransition(() => {
                    refetch();
                });
            } else {
                throw new Error(error || 'No se pudo eliminar el grupo');
            }
        } catch (err) {
            // Toast de error
            toast.error(
                <div>
                    <strong className="block mb-1">Error al eliminar</strong>
                    <p className="text-sm opacity-90">
                        {error || 'No se pudo eliminar el grupo. Intenta nuevamente.'}
                    </p>
                </div>,
                {
                    id: loadingToast,
                    duration: 4000,
                    style: {
                        borderRadius: '12px',
                        background: '#ef4444',
                        color: '#fff',
                        padding: '16px',
                    },
                }
            );
        } finally {
            setGroupToDelete(null);
        }
    };

    const handleEdit = (groupData: Group) => {
        setSelectedGroup(groupData);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedGroup(null);
    };

    const handleUpdate = () => {
        startTransition(() => {
            refetch();
        });
    };

    // ✅ Mostrar skeleton mientras carga
    if (loadingGroup) {
        return <GroupsLoadingSkeleton />;
    }

    // ✅ Mostrar error si hay problema
    if (errorGroup) {
        return (
            <div className="mt-10 mx-5 text-center">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
                    <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-red-600 font-semibold mb-4">Error al cargar los grupos</p>
                    <button 
                        onClick={() => refetch()} 
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* ✅ TOASTER */}
            <Toaster 
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#fff',
                        color: '#363636',
                        padding: '16px',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    },
                }}
            />

            <div className="mt-10 mx-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pr-5 pl-5">
                <div className="flex items-center gap-3">
                    <p className="text-2xl text-[#00000081] font-semibold">
                        Grupos
                    </p>
                    {isPending && (
                        <div className="flex items-center gap-2 text-violet-600">
                            <div className="w-4 h-4 border-2 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm font-medium">Actualizando...</span>
                        </div>
                    )}
                </div>

                <button
                    onClick={addBrigade}
                    className="bg-[#089ea1] text-white py-3 px-7 rounded-lg hover:bg-[#0dbfbe] transition-all duration-300 cursor-pointer w-full sm:w-auto shadow-sm hover:shadow-md font-medium"
                >
                    Agregar grupo
                </button>
            </div>

            <main className={`mt-8 px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10 transition-opacity duration-200 ${
                isPending ? 'opacity-60' : 'opacity-100'
            }`}>
                {memoizedGroups.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-gray-500 font-medium text-lg">No hay grupos registrados</p>
                        <p className="text-gray-400 text-sm mt-2">Agrega tu primer grupo para comenzar</p>
                    </div>
                ) : (
                    memoizedGroups.map((grp, index) => (
                        <div 
                            key={grp.idGroup || index} 
                            className="relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 overflow-visible group"
                        >
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-br from-violet-400 to-violet-500 h-7 w-7 rounded-full shadow-md"></div>

                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-50 to-transparent rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-70 transition-opacity"></div>

                            <div className="relative">
                                <div className="mb-5 mt-2">
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                                        {grp.nameGroup}
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
                                            {grp.dateGroup}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => handleEdit(grp)}
                                        disabled={isPending || isDeleting}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 hover:from-amber-100 hover:to-orange-100 border border-amber-200 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl font-medium group/btn disabled:opacity-50 disabled:cursor-not-allowed"
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
                                            if (typeof grp.idGroup === 'number') {
                                                handleDeleteClick(grp.idGroup, grp.nameGroup);
                                            }
                                        }}
                                        disabled={isDeleting || isPending}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-50 to-red-50 text-rose-700 hover:from-rose-100 hover:to-red-100 border border-rose-200 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                                    >
                                        {isDeleting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-rose-700 border-t-transparent rounded-full animate-spin"></div>
                                                <span className="text-sm">Eliminando...</span>
                                            </>
                                        ) : (
                                            <>
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
                                                <span className="text-sm">Eliminar</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </main>

            {/* ✅ MODAL DE CONFIRMACIÓN DE ELIMINACIÓN CON PORTAL */}
            {groupToDelete && (
                <DeleteGroupConfirmationModal
                    isOpen={showDeleteConfirm}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    groupName={groupToDelete.name}
                />
            )}

            {/* Modal de edición */}
            {selectedGroup && (
                <EditGroupModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    groupData={selectedGroup}
                    onUpdate={handleUpdate}
                />
            )}
        </>
    );
}

export default CardGroups;