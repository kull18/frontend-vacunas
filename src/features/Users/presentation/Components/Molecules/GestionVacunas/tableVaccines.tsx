import { useState, useRef, useEffect } from "react";
import { useModalVaccines } from "./ModalVaccineContext";
import { useGetVaccines } from "../../../../User/Presentation/Hooks/useGetVaccines";
import { useDeleteVaccine } from "../../../../User/Presentation/Hooks/useDeleteVaccine";
import type { Vaccine } from "../../../../User/Domain/Vaccine";
import DeleteVaccineModal from "./DeleteVaccineModal";
import { Trash2, Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";

function TableVaccines() {
  const { abrirModal } = useModalVaccines();
  const { vaccines, refetch, loading } = useGetVaccines();
  const { remove } = useDeleteVaccine();
  const tableContainerRef = useRef(null);
  const [searchVaccine, setSearchVaccine] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Estados para el modal de eliminación
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vaccineToDelete, setVaccineToDelete] = useState<{id: number, name: string} | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchVaccine]);

  // Abrir modal de eliminación
  const openDeleteModal = (id: number, name: string) => {
    setVaccineToDelete({ id, name });
    setShowDeleteModal(true);
  };

  // Confirmar eliminación
  const confirmDelete = async () => {
    if (!vaccineToDelete) return;
    
    setIsDeleting(true);
    try {
      const response = await remove(vaccineToDelete.id);
      if (!response) {
        alert("No se pudo eliminar la vacuna");
        throw new Error("Error al eliminar la vacuna");
      }
      await refetch();
      setShowDeleteModal(false);
      setVaccineToDelete(null);
    } catch (error) {
      alert("Error al eliminar la vacuna");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const filtredVaccines = searchVaccine.trim() ? 
    vaccines.filter((item: Vaccine) => item.nameVaccine === searchVaccine) : vaccines;

  // Calcular paginación
  const totalPages = Math.ceil(filtredVaccines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVaccines = filtredVaccines.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Control de inventario de vacunas
        </h1>
        <p className="text-gray-500 mt-1">Gestiona las vacunas disponibles en el sistema</p>
      </div>

      {/* Card Container */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Search and Add Button */}
        <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar vacuna..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                onChange={(e) => setSearchVaccine(e.target.value)}
              />
            </div>

            {/* Add Button */}
            <button
              onClick={abrirModal}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Agregar nueva vacuna
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div ref={tableContainerRef} className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Header */}
              <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Vacuna
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-gray-200">
                {currentVaccines.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-lg font-medium">No se encontraron vacunas</p>
                        <p className="text-sm">Agrega una nueva vacuna para comenzar</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentVaccines.map((vacuna, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <span className="text-gray-800 font-medium">{vacuna.nameVaccine}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openDeleteModal(vacuna.idVaccines, vacuna.nameVaccine)}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer con Paginación */}
        {filtredVaccines.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Contador */}
              <div className="text-sm text-gray-600">
                Mostrando <span className="font-semibold text-gray-800">{startIndex + 1}</span> a{" "}
                <span className="font-semibold text-gray-800">{Math.min(endIndex, filtredVaccines.length)}</span> de{" "}
                <span className="font-semibold text-gray-800">{filtredVaccines.length}</span> vacuna{filtredVaccines.length !== 1 ? 's' : ''}
              </div>

              {/* Controles de Paginación */}
              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>

                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                          currentPage === page
                            ? "bg-green-500 text-white"
                            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal de Eliminación */}
      <DeleteVaccineModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setVaccineToDelete(null);
        }}
        onConfirm={confirmDelete}
        vaccineName={vaccineToDelete?.name || ""}
        isDeleting={isDeleting}
      />
    </main>
  );
}

export default TableVaccines;