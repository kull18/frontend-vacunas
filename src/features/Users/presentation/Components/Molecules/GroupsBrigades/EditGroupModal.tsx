import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { useUpdateGroup } from "../../../../Group/Presentation/Hooks/useUpdateGroup"
import type { Group } from "../../../../Group/Domain/Group";

interface EditGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    groupData: Group | null;
    onUpdate: () => void;
}

function EditGroupModal({ isOpen, onClose, groupData, onUpdate }: EditGroupModalProps) {
    const [formData, setFormData] = useState({
        nameGroup: "",
        dateGroup: "",
        idVaccineBox: 0,
        idBrigade: 0
    });

    const { updateGroup, loading, error } = useUpdateGroup();

    // ✅ Bloquear scroll del body cuando el modal está abierto
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

    // Función para convertir fecha DD/MM/YYYY a YYYY-MM-DD
    const convertToInputFormat = (dateString: string) => {
        if (!dateString) return "";
        
        if (dateString.includes("-") && dateString.split("-")[0].length === 4) {
            return dateString;
        }
        
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

    // Cargar datos del grupo cuando cambie
    useEffect(() => {
        if (groupData) {
            setFormData({
                nameGroup: groupData.nameGroup,
                dateGroup: convertToInputFormat(groupData.dateGroup),
                idVaccineBox: groupData.idVaccineBox,
                idBrigade: groupData.idBrigade
            });
        }
    }, [groupData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!groupData?.idGroup) {
            toast.error('No se pudo identificar el grupo a actualizar', {
                duration: 3000,
                style: {
                    borderRadius: '12px',
                    background: '#ef4444',
                    color: '#fff',
                    padding: '16px',
                },
            });
            return;
        }

        // Validaciones
        const trimmedName = formData.nameGroup.trim();
        
        if (!trimmedName) {
            toast.error('El nombre del grupo no puede estar vacío', {
                duration: 3000,
                style: {
                    borderRadius: '12px',
                    background: '#ef4444',
                    color: '#fff',
                    padding: '16px',
                },
            });
            return;
        }

        if (trimmedName.length < 3) {
            toast.error('El nombre debe tener al menos 3 caracteres', {
                duration: 3000,
                style: {
                    borderRadius: '12px',
                    background: '#ef4444',
                    color: '#fff',
                    padding: '16px',
                },
            });
            return;
        }

        if (!formData.dateGroup) {
            toast.error('Debes seleccionar una fecha', {
                duration: 3000,
                style: {
                    borderRadius: '12px',
                    background: '#ef4444',
                    color: '#fff',
                    padding: '16px',
                },
            });
            return;
        }

        // Verificar si hubo cambios
        const noChanges = 
            trimmedName === groupData.nameGroup &&
            convertToDisplayFormat(formData.dateGroup) === groupData.dateGroup &&
            formData.idVaccineBox === groupData.idVaccineBox &&
            formData.idBrigade === groupData.idBrigade;

        if (noChanges) {
            toast('No se detectaron cambios en el grupo', {
                icon: 'ℹ️',
                duration: 3000,
                style: {
                    borderRadius: '12px',
                    background: '#3b82f6',
                    color: '#fff',
                    padding: '16px',
                },
            });
            return;
        }

        // Toast de carga
        const loadingToast = toast.loading('Actualizando grupo...', {
            style: {
                borderRadius: '12px',
                background: '#333',
                color: '#fff',
                padding: '16px',
            },
        });

        try {
            // Preparar datos para enviar
            const dataToUpdate: Partial<Group> = {
                nameGroup: trimmedName,
                dateGroup: convertToDisplayFormat(formData.dateGroup),
                idVaccineBox: formData.idVaccineBox,
                idBrigade: formData.idBrigade
            };

            await updateGroup(groupData.idGroup, dataToUpdate);
            
            // Toast de éxito
            toast.success(
                <div>
                    <strong className="block mb-1">¡Grupo actualizado!</strong>
                    <p className="text-sm opacity-90">
                        Los cambios se guardaron correctamente
                    </p>
                </div>,
                {
                    id: loadingToast,
                    duration: 4000,
                    icon: '✅',
                    style: {
                        borderRadius: '12px',
                        background: '#10b981',
                        color: '#fff',
                        padding: '16px',
                    },
                }
            );

            onUpdate(); // Refetch de datos
            onClose(); // Cerrar modal
        } catch (err) {
            // Toast de error
            toast.error(
                <div>
                    <strong className="block mb-1">Error al actualizar</strong>
                    <p className="text-sm opacity-90">
                        {error || 'No se pudo actualizar el grupo'}
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
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'idVaccineBox' || name === 'idBrigade' 
                ? Number(value) 
                : value
        }));
    };

    const handleCancel = () => {
        if (groupData) {
            setFormData({
                nameGroup: groupData.nameGroup,
                dateGroup: convertToInputFormat(groupData.dateGroup),
                idVaccineBox: groupData.idVaccineBox,
                idBrigade: groupData.idBrigade
            });
        }
        onClose();
    };

    if (!isOpen || !groupData) return null;

    // Detectar cambios
    const hasChanges = 
        formData.nameGroup.trim() !== groupData.nameGroup ||
        convertToDisplayFormat(formData.dateGroup) !== groupData.dateGroup ||
        formData.idVaccineBox !== groupData.idVaccineBox ||
        formData.idBrigade !== groupData.idBrigade;

    // ✅ RENDERIZAR CON PORTAL
    return createPortal(
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                onClick={handleCancel}
            ></div>

            {/* Modal centrado */}
            <div 
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-2xl px-4"
                style={{ position: 'fixed', maxHeight: '90vh' }}
            >
                <div className="bg-white rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in duration-200" style={{ maxHeight: '90vh' }}>
                    
                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-violet-600 to-purple-700 px-6 py-5 flex justify-between items-center rounded-t-2xl flex-shrink-0">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Editar Grupo</h2>
                            <p className="text-sm text-violet-100 mt-1">Modifica la información del grupo</p>
                        </div>
                        <button
                            onClick={handleCancel}
                            type="button"
                            disabled={loading}
                            className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                            aria-label="Cerrar modal"
                        >
                            <svg className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* CONTENT */}
                    <div className="overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin' }}>
                        <div className="p-8 space-y-6">
                            {/* Info actual */}
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-purple-800">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                    </svg>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Grupo actual</p>
                                        <p className="text-lg font-bold truncate">{groupData.nameGroup}</p>
                                    </div>
                                </div>
                            </div>

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
                                            disabled={loading}
                                            maxLength={100}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm 
                                                     focus:ring-2 focus:ring-violet-500 focus:border-violet-500 
                                                     transition-all duration-200 outline-none hover:border-gray-400 
                                                     bg-white disabled:opacity-50 disabled:cursor-not-allowed 
                                                     disabled:bg-gray-100"
                                            placeholder="Ej. Covid-19"
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formData.nameGroup.trim().length}/100 caracteres
                                        </p>
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
                                            disabled={loading}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm 
                                                     focus:ring-2 focus:ring-violet-500 focus:border-violet-500 
                                                     transition-all duration-200 outline-none hover:border-gray-400 
                                                     bg-white disabled:opacity-50 disabled:cursor-not-allowed 
                                                     disabled:bg-gray-100"
                                            required
                                        />
                                    </div>

                                    {/* ID Caja de Vacunas */}
                                    <div>
                                        <label htmlFor="idVaccineBox" className="block text-sm font-semibold text-gray-700 mb-2">
                                            ID Caja de Vacunas <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            id="idVaccineBox"
                                            name="idVaccineBox"
                                            value={formData.idVaccineBox}
                                            onChange={handleChange}
                                            disabled={loading}
                                            min="1"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm 
                                                     focus:ring-2 focus:ring-violet-500 focus:border-violet-500 
                                                     transition-all duration-200 outline-none hover:border-gray-400 
                                                     bg-white disabled:opacity-50 disabled:cursor-not-allowed 
                                                     disabled:bg-gray-100"
                                            required
                                        />
                                    </div>

                                    {/* ID Brigada */}
                                    <div>
                                        <label htmlFor="idBrigade" className="block text-sm font-semibold text-gray-700 mb-2">
                                            ID Brigada <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            id="idBrigade"
                                            name="idBrigade"
                                            value={formData.idBrigade}
                                            onChange={handleChange}
                                            disabled={loading}
                                            min="1"
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm 
                                                     focus:ring-2 focus:ring-violet-500 focus:border-violet-500 
                                                     transition-all duration-200 outline-none hover:border-gray-400 
                                                     bg-white disabled:opacity-50 disabled:cursor-not-allowed 
                                                     disabled:bg-gray-100"
                                            required
                                        />
                                    </div>

                                    {/* Indicador de cambios */}
                                    {hasChanges && formData.nameGroup.trim().length >= 3 && (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                            <div className="flex items-center gap-2 text-green-700">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-sm font-medium">Cambios detectados - Listo para actualizar</span>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </div>

                            {/* Mensaje de ayuda */}
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                <p className="text-xs text-gray-600">
                                    <span className="font-semibold">Nota:</span> Todos los campos son obligatorios. 
                                    Asegúrate de que la información sea correcta antes de guardar.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="bg-white border-t border-gray-200 px-8 py-4 rounded-b-2xl flex-shrink-0">
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={loading}
                                className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white 
                                         border-2 border-gray-300 rounded-lg hover:bg-gray-50 
                                         hover:border-gray-400 transition-all duration-200 
                                         focus:ring-2 focus:ring-gray-300 focus:ring-offset-2
                                         disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading || !hasChanges || formData.nameGroup.trim().length < 3}
                                className="px-6 py-2.5 text-sm font-semibold text-white 
                                         bg-gradient-to-r from-violet-600 to-purple-700 rounded-lg 
                                         hover:from-violet-700 hover:to-purple-800 transition-all 
                                         duration-200 shadow-lg shadow-violet-500/30 hover:shadow-xl 
                                         hover:shadow-violet-500/40 focus:ring-2 focus:ring-violet-500 
                                         focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                                         disabled:from-gray-400 disabled:to-gray-500
                                         flex items-center justify-center gap-2 min-w-[140px]"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Guardar cambios
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
}

export default EditGroupModal;