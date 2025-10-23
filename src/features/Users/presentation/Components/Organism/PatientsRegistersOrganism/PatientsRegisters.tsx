import PatientBarGraph from "../../Molecules/PacientesRegistrados/PatientBarGraph";
import PatientDonaPatients from "../../Molecules/PacientesRegistrados/PatientDonaPatients";
import TablePatientsRegister from "../../Molecules/PacientesRegistrados/tablePatientsRegisters";
import { useGetUserCivilsValues } from "../../../../User/Presentation/Hooks/useGetUserCivilVaccinatedValues";
import { useGetAlcohol } from "../../../../User/Presentation/Hooks/useGetAlcoholemia";
import { useGetSensorCheckDataValues } from "../../../../User/Presentation/Hooks/useGetSensorCheckDataValues";

function PatientsRegisters() {
  const { userCivilValues, refetch } = useGetUserCivilsValues();
  const { data: alcoholData, refetchAlcohol } = useGetAlcohol();


  console.log("data from alcoholemia", alcoholData)
  const stillLoading = !userCivilValues || !alcoholData;

  if (stillLoading) {
    return (
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            {/* Spinner animado */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            
            {/* Texto con animación de pulso */}
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700 animate-pulse">
                Cargando pacientes...
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Por favor espera un momento
              </p>
            </div>

            {/* Puntos animados */}
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ✅ CORRECCIÓN: userCivilValues ya ES el array directamente
  const vaccineData = Array.isArray(userCivilValues) ? userCivilValues : [];
  
  const labels = vaccineData.map((item) => item.vaccineName);
  const dataValues = vaccineData.map((item) => item.dosesApplied);

  console.log("labels", labels);
  console.log("dataValues", dataValues);

  return (
    <>
      <TablePatientsRegister refetchDataTable={refetch} refetchAlcohol={refetchAlcohol}/>
      
      {/* Grid responsive para las gráficas */}
      <div className="w-full flex justify-center items-center gap-4">
        {/* Gráfica de barras */}
        <div className="w-[45%] h-[75%]">
          {vaccineData.length > 0 ? (
            <PatientBarGraph labels={labels} dataValues={dataValues} />
          ) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 h-full flex items-center justify-center">
              <p className="text-gray-500">No hay datos de vacunas aún</p>
            </div>
          )}
        </div>
        
        {/* Gráfica de dona */}
        <div className="w-[45%] h-[75%]">
          {alcoholData.distribution !== undefined ? (
            <PatientDonaPatients data={alcoholData} totalCases={alcoholData.statistics.totalRecords}/>
          ) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 h-full flex items-center justify-center">
              <p className="text-gray-500">No hay datos de alcohol aún</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PatientsRegisters;