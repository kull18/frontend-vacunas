import style from "../../Molecules/HistorialVacunacionPaciente/main.module.css";
import { FilePatient } from "../../Pdf/filePatient";
import { useGetUserCivilVaccinatedValuesId } from "../../../../User/Presentation/Hooks/useGetUserCivilVaccinatedValuesId";
import { useLoginUser } from "../../../../User/Presentation/Hooks/useLoginUsers";

function TablePatients() {
  const { loggedUser } = useLoginUser();

  if (!loggedUser?.idUser) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent mb-3"></div>
          <p className="text-gray-600 text-sm font-medium">Cargando historial de vacunas...</p>
        </div>
      </div>
    );
  }

  const { data: historial } = useGetUserCivilVaccinatedValuesId(loggedUser.idUser);

  return (
    <>
      <main className="px-4 sm:px-7">
        <div className="mt-8 mb-4">
          <p className="text-2xl font-bold text-gray-800">Historial completo</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Fecha</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Vacuna (lote)</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Enfermero/a</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Certificado</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {historial?.vaccinations.map((registro, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">{registro.date}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{registro.vaccine.name}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{registro.medic.name} {registro.medic.lastname}</td>
                    <td className="px-6 py-3 text-center">
                      <button
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
                        onClick={() =>
                          FilePatient({
                            nombre: registro.medic.name,
                            dosis: registro.vaccine.name,
                            fecha: registro.date,
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
      </main>
    </>
  );
}

export default TablePatients;