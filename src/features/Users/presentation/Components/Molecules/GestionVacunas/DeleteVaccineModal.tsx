import { X, AlertTriangle } from "lucide-react";

interface DeleteVaccineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  vaccineName: string;
  isDeleting?: boolean;
}

function DeleteVaccineModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  vaccineName,
  isDeleting = false 
}: DeleteVaccineModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-in fade-in slide-in-from-bottom-4 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-gray-200">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={isDeleting}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Eliminar Vacuna
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Esta acción no se puede deshacer
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-gray-700">
                ¿Estás seguro de que deseas eliminar la vacuna{" "}
                <span className="font-bold text-red-600">"{vaccineName}"</span>?
              </p>
            </div>

            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span>Se eliminarán todos los registros asociados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span>Esta acción es permanente e irreversible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span>Los datos no podrán ser recuperados</span>
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Eliminando...
                  </>
                ) : (
                  "Eliminar vacuna"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteVaccineModal;