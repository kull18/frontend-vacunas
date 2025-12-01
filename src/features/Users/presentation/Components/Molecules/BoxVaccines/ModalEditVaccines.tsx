import { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAmount(currentAmount);
  }, [currentAmount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (amount < 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Cantidad inválida',
        text: 'La cantidad debe ser mayor a 0',
      });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`TU_API_URL/boxes/${boxId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amountVaccines: amount
        })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar');
      }

      await Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: 'La cantidad de vacunas ha sido actualizada correctamente',
        timer: 2000,
        showConfirmButton: false,
      });

      onUpdate();
      onClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar la cantidad de vacunas',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-sm z-50 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-2xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-gray-100 flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-white">Editar Cantidad</h2>
            <p className="text-sm text-blue-100 mt-1">Actualice la cantidad de vacunas</p>
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
        <div className="p-8">
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Cantidad de Vacunas</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
                  Cantidad de vacunas <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="amount"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-400 bg-white"
                    placeholder="Ingrese la cantidad"
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Cantidad actual: <span className="font-semibold text-blue-600">{currentAmount}</span>
                </p>
              </div>

              {/* Controles rápidos */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setAmount(Math.max(1, amount - 1))}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 font-semibold text-sm"
                >
                  - 1
                </button>
                <button
                  type="button"
                  onClick={() => setAmount(amount + 1)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 font-semibold text-sm"
                >
                  + 1
                </button>
                <button
                  type="button"
                  onClick={() => setAmount(amount + 10)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 font-semibold text-sm"
                >
                  + 10
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* FOOTER */}
        <div className="bg-white border-t border-gray-200 px-8 py-4 rounded-b-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
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
        body {
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

export default ModalEditVaccines;