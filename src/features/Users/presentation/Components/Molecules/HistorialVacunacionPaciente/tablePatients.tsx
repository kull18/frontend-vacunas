// Molecules/HistorialVacunacionPaciente/tablePatients.tsx
import { FilePatient } from "../../Pdf/filePatient";
import { useGetPatientVaccines } from "../../../../User/Presentation/Hooks/useGetPatientVaccines";
import { useLoginUser } from "../../../../User/Presentation/Hooks/useLoginUsers";

function TablePatients() {
  const { loggedUser } = useLoginUser();
  const { data: patientData, loading, error, refetch } = useGetPatientVaccines(loggedUser?.idUserCivil ?? null);

  if (!loggedUser?.idUser) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent mb-3"></div>
          <p className="text-gray-600 text-sm font-medium">Verificando usuario...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent mb-3"></div>
          <p className="text-gray-600 text-sm font-medium">Cargando historial de vacunas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 sm:px-7 py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-700 font-medium mb-2">Error al cargar el historial</p>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button
            onClick={refetch}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!patientData?.summary.hasVaccinations) {
    return (
      <div className="px-4 sm:px-7 py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
          <svg className="w-16 h-16 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-blue-700 font-semibold text-lg mb-2">No hay vacunas registradas</p>
          <p className="text-blue-600 text-sm">Este paciente aún no tiene vacunas aplicadas en el sistema</p>
        </div>
      </div>
    );
  }

  return (
    <main className="px-4 sm:px-7">
      <div className="mt-8 mb-4 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-800">Historial completo</p>
          <p className="text-sm text-gray-600 mt-1">
            {patientData.patient.fullName} - {patientData.totalVaccinations} {patientData.totalVaccinations === 1 ? 'vacuna' : 'vacunas'} aplicadas
          </p>
        </div>
        <button
          onClick={refetch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Actualizar
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Fecha</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Vacuna</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Certificado</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {patientData.vaccinations.map((vaccination, index) => (
                <tr key={`${vaccination.vaccinationId.patientId}-${vaccination.vaccinationId.vaccineId}-${index}`} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">
                    {new Date(vaccination.date).toLocaleDateString('es-MX', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    <div>
                      <p className="font-medium">{vaccination.vaccine.name}</p>
                      <p className="text-xs text-gray-500">ID: {vaccination.vaccine.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                      onClick={() =>
                        FilePatient({
                          nombre: patientData.patient.fullName,
                          dosis: vaccination.vaccine.name,
                          fecha: new Date(vaccination.date).toLocaleDateString('es-MX'),
                        })
                      }
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Descargar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumen de vacunas */}
      {patientData.vaccineCounts.length > 0 && (
        <div className="mt-6 bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <p className="text-lg font-bold text-gray-800 mb-4">Resumen de vacunas</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {patientData.vaccineCounts.map((vaccine, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <p className="text-2xl font-bold text-blue-600">{vaccine.dosesApplied}</p>
                <p className="text-sm text-gray-700 mt-1">{vaccine.vaccineName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default TablePatients;