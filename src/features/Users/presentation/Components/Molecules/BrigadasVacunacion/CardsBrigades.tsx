import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import style from "../../Molecules/RegistroBrigadasVacunacion/brigades.module.css";
import ubicacion from "../../../../../../assets/ubication.png";
import location from "../../../../../../assets/location.png";
import { useNavigate } from "react-router-dom";
import { useModalBrigades } from "../RegistroBrigadasVacunacion/ModalBrigadesContext";
import { useGetBrigades } from "../../../../Brigades/Presentation/Hooks/useGetBrigades";
import { useDeleteBrigade } from "../../../../Brigades/Presentation/Hooks/useDeleteBrigades";
import { BrigadesRepository } from "../../../../Brigades/Domain/BrigadesRepository";

// ✅ COMPONENTE DE MODAL DE CONFIRMACIÓN DE ELIMINACIÓN
interface DeleteBrigadeConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  brigadeName: string;
}

function DeleteBrigadeConfirmationModal({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  brigadeName 
}: DeleteBrigadeConfirmationModalProps) {
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
              <h2 className="text-xl font-bold text-white">Eliminar Brigada</h2>
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

            {/* Información de la brigada */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 justify-center">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <p className="text-sm text-gray-700">
                  Brigada:{' '}
                  <span className="font-bold text-red-700">{brigadeName}</span>
                </p>
              </div>
            </div>

            <p className="text-center text-gray-600 text-sm mb-6">
              Se eliminarán todas las localizaciones y la información asociada a esta brigada permanentemente.
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

// ✅ COMPONENTE PRINCIPAL
function CardsBrigades() {
  const { abrirModal } = useModalBrigades();
  const { groupedBrigades, refreshBrigades } = useGetBrigades();
  const brigadesRepository = new BrigadesRepository();
  const { deleteBrigade, loading: deleting } = useDeleteBrigade(brigadesRepository);
  const navigate = useNavigate();

  // ✅ Estados para el modal de confirmación
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [brigadeToDelete, setBrigadeToDelete] = useState<{ id: number; name: string } | null>(null);

  const getBrigadeById = (idBrigade: number) => {
    navigate(`/dashboard/brigada-individual/administrador/${idBrigade}`);
  };

  // ✅ Abrir modal de confirmación
  const handleDeleteClick = (id: number, name: string) => {
    setBrigadeToDelete({ id, name });
    setShowDeleteModal(true);
  };

  // ✅ Cancelar eliminación
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setBrigadeToDelete(null);
  };

  // ✅ Confirmar eliminación
  const handleConfirmDelete = async () => {
    if (!brigadeToDelete) return;

    setShowDeleteModal(false);

    try {
      await deleteBrigade(brigadeToDelete.id);
      await refreshBrigades(); // Refetch para actualizar la lista
      // Opcional: puedes agregar un toast de éxito aquí
    } catch (err) {
      console.error("Error al eliminar la brigada:", err);
      // Opcional: puedes agregar un toast de error aquí
    } finally {
      setBrigadeToDelete(null);
    }
  };

  return (
    <>
      <div className="mt-10 mx-5 flex flex-col ml-10 sm:flex-row sm:justify-between sm:items-center gap-3">
        <p className="text-2xl text-[#00000081] font-semibold" id={style.title1}>
          Brigadas de vacunación
        </p>

        <button
          onClick={abrirModal}
          className="bg-[#089ea1] text-white py-3 px-6 rounded-lg hover:bg-[#0dbfbe] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 w-full sm:w-auto font-medium"
        >
          Agregar brigada
        </button>
      </div>

      <main id={style.containerGrid} className="mt-8 mx-5 ml-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groupedBrigades.map((brigada) => (
          <div
            key={brigada.idBrigade}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 relative border border-gray-100 hover:border-teal-200"
          >
            {/* Círculo decorativo superior */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-teal-400 to-teal-600 h-7 w-7 rounded-full shadow-lg"></div>

            {/* Título */}
            <div className="text-center mb-5 pt-2">
              <h3 className="text-xl font-bold text-gray-800">
                {brigada.referenceBrigade}
              </h3>
              <div className="mt-2 mx-auto w-16 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"></div>
            </div>

            {/* Información */}
            <div className="space-y-4 mb-6">
              {/* Fechas */}
              <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <img src={ubicacion} alt="calendar" className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="text-gray-600 mb-1">
                      <span className="font-semibold text-gray-700">Inicio:</span>{" "}
                      {new Date(brigada.startDate).toLocaleString("es-MX")}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-700">Fin:</span>{" "}
                      {new Date(brigada.endDate).toLocaleString("es-MX")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Localizaciones */}
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <img src={location} alt="location" className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Localizaciones:</span>
                      <span className="ml-2 inline-flex items-center justify-center bg-teal-500 text-white rounded-full w-7 h-7 text-sm font-bold">
                        {brigada.locationsCount}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {/* Botón Editar */}
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-200 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl cursor-pointer group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 group-hover:scale-110 transition-transform"
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
                  <span className="text-sm font-medium">Editar</span>
                </button>

                {/* Botón Eliminar */}
                <button
                  onClick={() => handleDeleteClick(brigada.idBrigade, brigada.referenceBrigade)}
                  disabled={deleting}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-100 text-rose-700 hover:bg-rose-200 border border-rose-200 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-rose-700 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm font-medium">Eliminando...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 group-hover:scale-110 transition-transform"
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
                      <span className="text-sm font-medium">Eliminar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Botón Ver Localizaciones */}
              <button
                onClick={() => getBrigadeById(brigada.idBrigade)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl cursor-pointer group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 group-hover:scale-110 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-medium">Ver localizaciones</span>
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* ✅ MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
      {brigadeToDelete && (
        <DeleteBrigadeConfirmationModal
          isOpen={showDeleteModal}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          brigadeName={brigadeToDelete.name}
        />
      )}
    </>
  );
}

export default CardsBrigades;