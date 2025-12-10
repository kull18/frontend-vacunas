import { useState, useTransition, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import style from "../../Molecules/BoxVaccines/box.module.css";
import vaccine from "../../../../../../assets/vacunas.png";
import { useModalBrigadesVaccine } from "../RegistroBrigadasVacunacion/ModalBrigadesVaccineContext";
import { useModalVaccinesPrincipal } from "../GestionVacunas/ModalVaccinesPrincipalContext";
import { useGetBox } from "../../../../BoxVaccine/Presentation/Hooks/useGetBoxVaccine";
import { BoxRepository } from "../../../../BoxVaccine/Domain/BoxVaccineRepository";
import { useDeleteBox } from "../../../../BoxVaccine/Presentation/Hooks/useDeleteBox";
import ModalEditVaccines from "./ModalEditVaccines";

// ✅ COMPONENTE DE CONFIRMACIÓN DE ELIMINACIÓN CON PORTAL
interface DeleteBoxConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  amountVaccines: number;
}

function DeleteBoxConfirmationModal({ isOpen, onConfirm, onCancel, amountVaccines }: DeleteBoxConfirmationModalProps) {
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
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        onClick={onCancel}
      ></div>

      <div 
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-lg px-4"
        style={{ position: 'fixed' }}
      >
        <div className="bg-white rounded-2xl shadow-2xl animate-in zoom-in fade-in duration-200">
          <div className="bg-red-600 px-6 py-4 flex justify-between items-center rounded-t-2xl">
            <div>
              <h2 className="text-xl font-bold text-white">Eliminar Caja de Vacunas</h2>
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

          <div className="p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 justify-center">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <p className="text-sm text-gray-700">
                  Esta caja contiene{' '}
                  <span className="font-bold text-red-700">{amountVaccines} vacunas</span>
                </p>
              </div>
            </div>

            <p className="text-center text-gray-600 text-sm mb-6">
              Toda la información de esta caja será eliminada permanentemente del sistema.
            </p>

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
function BoxesLoadingSkeleton() {
  return (
    <>
      <div className="mt-10 mx-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pl-7 pr-7">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="gap-5 flex">
          <div className="h-12 w-40 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-12 w-40 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <main id={style.containerGrid} className="mt-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="h-32 bg-gray-100 rounded animate-pulse mb-4"></div>
            <div className="h-10 bg-gray-100 rounded animate-pulse mb-3"></div>
            <div className="flex gap-3">
              <div className="h-10 flex-1 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-10 flex-1 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}

// ✅ Main Component - SIN Suspense
function CardsBoxVaccines() {
  const { abrirModalVaccine } = useModalBrigadesVaccine();
  const { abrirModal } = useModalVaccinesPrincipal();
  const { box, loadingBox, errorBox, refetch } = useGetBox();
  const { deleteBox, loading: deletingBox } = useDeleteBox(new BoxRepository());
  
  const [isPending, startTransition] = useTransition();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState<{id: number, amount: number} | null>(null);
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [boxToDelete, setBoxToDelete] = useState<{id: number, amount: number} | null>(null);

  const memoizedBoxes = useMemo(() => box || [], [box]);

  const handleDeleteClick = (idBox: number, amountVaccines: number) => {
    setBoxToDelete({ id: idBox, amount: amountVaccines });
    setShowDeleteConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setBoxToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!boxToDelete) return;

    setShowDeleteConfirm(false);

    const loadingToast = toast.loading('Eliminando caja de vacunas...', {
      style: {
        borderRadius: '12px',
        background: '#333',
        color: '#fff',
        padding: '16px',
      },
    });

    try {
      const success = await deleteBox(boxToDelete.id);
      
      if (success) {
        toast.success(
          <div>
            <strong className="block mb-1">¡Caja eliminada!</strong>
            <p className="text-sm opacity-90">
              Se eliminaron {boxToDelete.amount} vacunas
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
        
        startTransition(() => {
          refetch();
        });
      } else {
        throw new Error('No se pudo eliminar la caja');
      }
    } catch (err) {
      toast.error(
        <div>
          <strong className="block mb-1">Error al eliminar</strong>
          <p className="text-sm opacity-90">
            No se pudo eliminar la caja. Intenta nuevamente.
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
      setBoxToDelete(null);
    }
  };

  const handleEdit = (idBox: number, currentAmount: number) => {
    setSelectedBox({ id: idBox, amount: currentAmount });
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedBox(null);
  };

  const handleUpdateSuccess = () => {
    startTransition(() => {
      refetch();
    });
  };

  // ✅ Mostrar skeleton mientras carga
  if (loadingBox) {
    return <BoxesLoadingSkeleton />;
  }

  // ✅ Mostrar error si existe
  if (errorBox) {
    return (
      <div className="mt-10 mx-5 text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-red-600 font-semibold">Error al cargar las cajas</p>
          <button 
            onClick={() => refetch()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
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

      <div className="mt-10 mx-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pl-7 pr-7">
        <div className="flex items-center gap-3">
          <p className="text-2xl text-[#00000081]" id={style.title1}>
            Cajas de vacunas
          </p>
          {isPending && (
            <div className="flex items-center gap-2 text-blue-600">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Actualizando...</span>
            </div>
          )}
        </div>

        <div className="gap-5 flex">
          <button
            onClick={abrirModal}
            className="bg-[#74b76d] text-white py-3 px-5 sm:px-7 rounded hover:bg-[#1677ff99] transition cursor-pointer w-full sm:w-auto"
          >
            Agregar vacuna
          </button>

          <button
            onClick={abrirModalVaccine}
            className="bg-[#5ebcff] text-white py-3 px-5 sm:px-7 rounded hover:bg-[#1677ff99] transition cursor-pointer w-full sm:w-auto"
          >
            Agregar caja
          </button>
        </div>
      </div>

      <main 
        id={style.containerGrid} 
        className={`mt-1 transition-opacity duration-200 ${isPending ? 'opacity-60' : 'opacity-100'}`}
      >
        {memoizedBoxes.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-gray-500 font-medium text-lg">No hay cajas de vacunas</p>
            <p className="text-gray-400 text-sm mt-2">Agrega tu primera caja para comenzar</p>
          </div>
        ) : (
          memoizedBoxes.map((boxs, index) => (
            <div key={boxs.idVaccineBox || index} id={style.card}>
              <div id={style.medicalStrip}></div>
              
              <div id={style.medicalIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 7V12M12 12V17M12 12H7M12 12H17M5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20Z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>

              <div className="space-y-2 text-sm text-gray-800 mt-3 relative z-10">
                <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-lg">
                  <img src={vaccine} alt="vacunas" className="w-5 h-5" />
                  <div className="flex gap-2">
                    <p>Cantidad de vacunas: </p>
                    <p className="font-bold text-blue-600">{boxs.amountVaccines}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row justify-between gap-3">
                <button 
                  onClick={() => handleEdit(boxs.idVaccineBox, boxs.amountVaccines)}
                  disabled={isPending || deletingBox}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 hover:from-amber-200 hover:to-amber-100 border border-amber-200 transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto rounded-xl cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span className="group-hover:font-medium">Editar</span>
                </button>

                <button 
                  onClick={() => handleDeleteClick(boxs.idVaccineBox, boxs.amountVaccines)}
                  disabled={isPending || deletingBox}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-50 to-rose-100 text-rose-700 hover:from-rose-100 hover:to-rose-50 border border-rose-200 transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto rounded-xl cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingBox ? (
                    <>
                      <div className="w-5 h-5 border-2 border-rose-700 border-t-transparent rounded-full animate-spin"></div>
                      <span>Eliminando...</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span className="group-hover:font-medium">Eliminar</span>
                    </>
                  )}
                </button>
              </div>
              
              <div id={style.medicalPattern}></div>
            </div>
          ))
        )}
      </main>

      {boxToDelete && (
        <DeleteBoxConfirmationModal
          isOpen={showDeleteConfirm}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          amountVaccines={boxToDelete.amount}
        />
      )}

      {selectedBox && (
        <ModalEditVaccines
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          boxId={selectedBox.id}
          currentAmount={selectedBox.amount}
          onUpdate={handleUpdateSuccess}
        />
      )}
    </>
  );
}

export default CardsBoxVaccines;