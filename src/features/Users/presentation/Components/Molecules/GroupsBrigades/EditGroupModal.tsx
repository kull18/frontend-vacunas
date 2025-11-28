// EditGroupModal.tsx
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface EditGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    groupData: {
        idGroup?: number;
        nameGroup: string;
        dateGroup: string;
    } | null;
    onSave: (groupId: number, updatedData: { nameGroup: string; dateGroup: string }) => Promise<boolean>;
}

function EditGroupModal({ isOpen, onClose, groupData, onSave }: EditGroupModalProps) {
    const [formData, setFormData] = useState({
        nameGroup: "",
        dateGroup: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    // Función para convertir fecha DD/MM/YYYY a YYYY-MM-DD
    const convertToInputFormat = (dateString: string) => {
        if (!dateString) return "";
        
        // Si ya está en formato YYYY-MM-DD, retornar tal cual
        if (dateString.includes("-") && dateString.split("-")[0].length === 4) {
            return dateString;
        }
        
        // Si está en formato DD/MM/YYYY, convertir
        const parts = dateString.split("/");
        if (parts.length === 3) {
            const [day, month, year] = parts;
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        
        return "";
    };

    // Función para convertir fecha YYYY-MM-DD a DD/MM/YYYY
    const convertToDisplayFormat = (dateString: string) => {
        if (!dateString) return "";
        
        const parts = dateString.split("-");
        if (parts.length === 3) {
            const [year, month, day] = parts;
            return `${day}/${month}/${year}`;
        }
        
        return dateString;
    };

    useEffect(() => {
        if (groupData) {
            setFormData({
                nameGroup: groupData.nameGroup,
                dateGroup: convertToInputFormat(groupData.dateGroup)
            });
        }
    }, [groupData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!groupData?.idGroup) return;

        setIsLoading(true);
        
        // Convertir la fecha al formato que espera el backend antes de guardar
        const dataToSave = {
            nameGroup: formData.nameGroup,
            dateGroup: convertToDisplayFormat(formData.dateGroup)
        };
        
        const success = await onSave(groupData.idGroup, dataToSave);
        setIsLoading(false);

        if (success) {
            await Swal.fire({
                title: '¡Actualizado!',
                text: 'El grupo ha sido actualizado correctamente',
                icon: 'success',
                confirmButtonColor: '#089ea1'
            });
            onClose();
        } else {
            await Swal.fire({
                title: 'Error',
                text: 'No se pudo actualizar el grupo',
                icon: 'error',
                confirmButtonColor: '#d33'
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white absolute top-1/4 w-full max-w-2xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-gray-100 max-h-[90vh] flex flex-col">
                    
                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-violet-600 to-purple-700 px-6 py-5 flex justify-between items-center rounded-t-2xl">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Editar Grupo</h2>
                            <p className="text-sm text-violet-100 mt-1">Modifica la información del grupo</p>
                        </div>
                        <button
                            onClick={onClose}
                            type="button"
                            className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 group"
                            aria-label="Cerrar modal"
                        >
                            <svg className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* CONTENT */}
                    <div className="overflow-y-auto flex-1 scrollbar-hide">
                        <div className="p-8 space-y-6">
                            <div className="bg-gradient-to-br from-violet-50 to-white p-6 rounded-xl border border-violet-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center shadow-md">
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">Información del Grupo</h3>
                                </div>
                                
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Nombre del grupo */}
                                    <div>
                                        <label htmlFor="nameGroup" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Nombre del grupo <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="nameGroup"
                                            name="nameGroup"
                                            value={formData.nameGroup}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-400 bg-white"
                                            placeholder="Ej. Covid-19"
                                            required
                                        />
                                    </div>

                                    {/* Fecha de aplicación */}
                                    <div>
                                        <label htmlFor="dateGroup" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Fecha de aplicación <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            id="dateGroup"
                                            name="dateGroup"
                                            value={formData.dateGroup}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-400 bg-white"
                                            required
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="bg-white border-t border-gray-200 px-8 py-4 rounded-b-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                                disabled={isLoading}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-700 rounded-lg hover:from-violet-700 hover:to-purple-800 transition-all duration-200 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Guardando...
                                    </div>
                                ) : (
                                    'Guardar cambios'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                body {
                    overflow: hidden;
                }
            `}</style>
        </>
    );
}

export default EditGroupModal;