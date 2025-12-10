import { useCallback, useState, useTransition, useDeferredValue, useMemo } from "react";
import { useGetUserCivils } from "../../../../User/Presentation/Hooks/useGetUserCivils";
import type { UserCivil } from "../../../../User/Domain/UserCIvil";
import { ModalAgregarSeleccionarVacuna } from "./ModalAgregarVacunaSeleccionada";
import ModalPacientes from "./ModalPacientes";

function TablePatientsRegister({ 
  refetchDataTable, 
  refetchAlcohol 
}: { 
  refetchDataTable: () => void;
  refetchAlcohol: () => void;
}) {
  const { userCivils, refetchUserCivils } = useGetUserCivils();
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState<UserCivil | null>(null);
  const [mostrarModalVacuna, setMostrarModalVacuna] = useState(false);
  const [mostrarPacienteCivil, setMostrarModalPacienteCivil] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  
  const itemsPerPage = 5;

  // useDeferredValue para el término de búsqueda
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // useMemo para filtrado - solo se recalcula cuando cambia deferredSearchTerm
  const filteredUserCivils = useMemo(() => {
    if (!deferredSearchTerm.trim()) return userCivils;
    
    return userCivils.filter((user: UserCivil) =>
      `${user.name} ${user.firstLastname} ${user.secondLastname}`
        .toLowerCase()
        .includes(deferredSearchTerm.toLowerCase())
    );
  }, [userCivils, deferredSearchTerm]);

  const totalPages = Math.ceil(filteredUserCivils.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUserCivils = filteredUserCivils.slice(startIndex, endIndex);

  // Detectar si la búsqueda está "stale"
  const isSearchStale = searchTerm !== deferredSearchTerm;

  // Handler del input de búsqueda - actualización urgente
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value); // Actualización urgente - el input responde inmediatamente
    
    // Actualización no urgente - resetear página
    startTransition(() => {
      setCurrentPage(1);
    });
  };

  // Handler de cambio de página con transición
  const handlePageChange = (newPage: number) => {
    startTransition(() => {
      setCurrentPage(newPage);
    });
  };

  const handleCloseModal = useCallback(() => {
    setMostrarModalVacuna(false);
    setPacienteSeleccionado(null);
  }, []);

  const handleCloseModalPaciente = useCallback(() => {
    setMostrarModalPacienteCivil(false);
  }, []);

  return (
    <>
      <div className="px-4 sm:px-12 py-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Pacientes Registrados
          </h2>
          <p className="text-gray-500 mt-2">Gestión y seguimiento de pacientes</p>
        </div>

        {/* Controles superiores */}
        <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-8 flex-1">
            <div className="relative flex-1 max-w-xl">
              <svg 
                className="absolute left-8 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por nombre..."
                className="w-full pl-10 pr-12 py-3 border-2 border-blue-500 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 bg-white transition-all"
                onChange={handleSearchChange}
                value={searchTerm}
              />
              {/* Indicador de búsqueda en progreso */}
              {isSearchStale && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <button
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-bold whitespace-nowrap hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              onClick={() => setMostrarModalPacienteCivil(true)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Agregar Paciente
            </button>
          </div>

          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2.5 rounded-lg border border-blue-200">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-sm font-semibold text-blue-900">
              Total: <span className="text-blue-600">{filteredUserCivils.length}</span> pacientes
            </span>
          </div>
        </div>

        {/* Tabla con transición de opacity cuando isPending */}
        <div className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-opacity duration-200 ${
          isPending ? 'opacity-60' : 'opacity-100'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Nombre completo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Folio
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Alcoholemia
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Temperatura
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Vacuna
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {currentUserCivils.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-gray-500 font-medium">
                          {searchTerm ? 'No se encontraron pacientes' : 'No hay pacientes registrados'}
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          {searchTerm ? 'Intenta con otro término de búsqueda' : 'Agrega tu primer paciente para comenzar'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentUserCivils.map((v: UserCivil) => (
                    <tr 
                      key={`${v.idUserCivil}-${v.isVaccinated}`} 
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                            {v.name?.charAt(0)}{v.firstLastname?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {v.name} {v.firstLastname}
                            </p>
                            {v.secondLastname && (
                              <p className="text-xs text-gray-500">{v.secondLastname}</p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                          {v.fol}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          v.alcoholBreat > 0.5 
                            ? "bg-green-100 text-green-700 border border-green-200" 
                            : "bg-red-100 text-red-700 border border-red-200"
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            v.alcoholBreat > 0.5 ? "bg-green-500" : "bg-red-500"
                          }`}></span>
                          {v.alcoholBreat > 0.5 ? "POSITIVO" : "NEGATIVO"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a3 3 0 00-3 3v6.5a4 4 0 106 0V5a3 3 0 00-3-3zm0 14a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-medium text-gray-700">
                            {v.corporalTemperature}°C
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        {v.isVaccinated === 1 ? (
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 border border-green-200">
                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-semibold text-green-700">Aplicada</span>
                          </span>
                        ) : (
                          <button
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold text-sm hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            onClick={() => {
                              setPacienteSeleccionado(v);
                              setMostrarModalVacuna(true);
                            }}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Agregar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {filteredUserCivils.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Mostrando <span className="font-semibold text-gray-900">{startIndex + 1}</span> a{" "}
                <span className="font-semibold text-gray-900">
                  {Math.min(endIndex, filteredUserCivils.length)}
                </span>{" "}
                de <span className="font-semibold text-gray-900">{filteredUserCivils.length}</span> pacientes
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1 || isPending}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          disabled={isPending}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === page
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          } disabled:opacity-50`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="px-2 text-gray-400">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages || isPending}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {mostrarModalVacuna && pacienteSeleccionado && (
        <ModalAgregarSeleccionarVacuna
          refetchDataTable={refetchDataTable}
          paciente={pacienteSeleccionado} 
          onClose={handleCloseModal}
          refetchUserCivils={refetchUserCivils}
        />
      )}

      {mostrarPacienteCivil && (
        <ModalPacientes 
          refetchAlcohol={refetchAlcohol}
          refetch={refetchUserCivils}
          onClose={handleCloseModalPaciente}
        />
      )}
    </>
  );
}

export default TablePatientsRegister;