import { useState, useEffect } from "react";
import { useUpdateBox } from "../../../../BoxVaccine/Presentation/Hooks/useUpdateBox";
import Swal from "sweetalert2";

interface ModalEditVaccinesProps {
  isOpen: boolean;
  onClose: () => void;
  boxId: number;
  currentAmount: number;
  onUpdate: () => void;
}

function ModalEditVaccines({ 
  isOpen, 
  onClose, 
  boxId, 
  currentAmount, 
  onUpdate 
}: ModalEditVaccinesProps) {
  const [amount, setAmount] = useState(currentAmount);
  const { updateBox, loading, error } = useUpdateBox();

  // Actualizar el valor cuando cambie currentAmount
  useEffect(() => {
    setAmount(currentAmount);
  }, [currentAmount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (amount < 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La cantidad no puede ser negativa",
      });
      return;
    }

    if (amount === currentAmount) {
      Swal.fire({
        icon: "info",
        title: "Sin cambios",
        text: "La cantidad es la misma que la actual",
      });
      return;
    }

    try {
      await updateBox(boxId, { amountVaccines: amount });
      
      await Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: 'La cantidad de vacunas ha sido actualizada correctamente',
        timer: 2000,
        showConfirmButton: false,
      });

      onUpdate(); // Refetch de datos
      onClose(); // Cerrar modal
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error || 'No se pudo actualizar la caja',
      });
    }
  };

  const handleCancel = () => {
    setAmount(currentAmount); // Resetear al valor original
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-white">Editar Caja de Vacunas</h2>
            <p className="text-sm text-blue-100 mt-1">Actualiza la cantidad de vacunas disponibles</p>
          </div>
          <button
            onClick={handleCancel}
            disabled={loading}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Cerrar modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            {/* Info actual */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-800">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium">Cantidad actual</p>
                  <p className="text-2xl font-bold">{currentAmount} vacunas</p>
                </div>
              </div>
            </div>

            {/* Input de cantidad */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nueva cantidad de vacunas <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  disabled={loading}
                  className="w-full px-4 py-3 pr-20 border-2 border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                           outline-none transition-all text-lg font-medium
                           disabled:opacity-50 disabled:cursor-not-allowed
                           disabled:bg-gray-100"
                  placeholder="Ej: 100"
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-medium">
                  vacunas
                </div>
              </div>
              
              {/* Indicador de cambio */}
              {amount !== currentAmount && (
                <div className={`mt-2 text-sm font-medium flex items-center gap-1 ${
                  amount > currentAmount ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {amount > currentAmount ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      Incremento de {amount - currentAmount} vacunas
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Reducción de {currentAmount - amount} vacunas
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mensaje de ayuda */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Nota:</span> La cantidad debe ser un número entero positivo. 
                Asegúrate de que corresponda con el inventario físico real.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 pt-2">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 
                         rounded-lg hover:bg-gray-50 font-semibold transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading || amount === currentAmount}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 
                         text-white rounded-lg hover:from-blue-700 hover:to-blue-800 
                         font-semibold transition-all shadow-md hover:shadow-lg
                         disabled:opacity-50 disabled:cursor-not-allowed
                         disabled:from-gray-400 disabled:to-gray-500
                         flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Actualizando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Guardar Cambios
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditVaccines;