import { useDeferredValue, useState, useEffect } from 'react';
import PatientBarGraph from "../../Molecules/PacientesRegistrados/PatientBarGraph";
import PatientDonaPatients from "../../Molecules/PacientesRegistrados/PatientDonaPatients";
import TablePatientsRegister from "../../Molecules/PacientesRegistrados/tablePatientsRegisters";
import { useGetUserCivilsValues } from "../../../../User/Presentation/Hooks/useGetUserCivilVaccinatedValues";
import { useGetAlcohol } from "../../../../User/Presentation/Hooks/useGetAlcoholemia";

// Componente de Loading Skeleton
function LoadingSkeleton() {
  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700 animate-pulse">
              Cargando datos...
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Por favor espera un momento
            </p>
          </div>

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

function PatientsRegisters() {
  const { userCivilValues, refetch } = useGetUserCivilsValues();
  const { data: alcoholData, refetchAlcohol } = useGetAlcohol();
  
  const [isLoading, setIsLoading] = useState(true);

  // useDeferredValue para optimizar actualizaciones pesadas
  const deferredVaccineData = useDeferredValue(userCivilValues);
  const deferredAlcoholData = useDeferredValue(alcoholData);

  // Controlar carga - los datos están listos cuando ambos NO son undefined
  useEffect(() => {
    if (userCivilValues !== undefined && alcoholData !== undefined) {
      setIsLoading(false);
    }
  }, [userCivilValues, alcoholData]);

  // Mostrar skeleton mientras carga
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const vaccineData = Array.isArray(deferredVaccineData) ? deferredVaccineData : [];
  const labels = vaccineData.map((item) => item.vaccineName);
  const dataValues = vaccineData.map((item) => item.dosesApplied);

  // Detectar si los datos están "stale"
  const isVaccineStale = userCivilValues !== deferredVaccineData;
  const isAlcoholStale = alcoholData !== deferredAlcoholData;

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <TablePatientsRegister refetchDataTable={refetch} refetchAlcohol={refetchAlcohol}/>
      
      <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-6 mt-8">
        {/* Gráfica de barras */}
        <div className={`w-full lg:w-[45%] h-[400px] transition-opacity duration-200 ${isVaccineStale ? 'opacity-60' : 'opacity-100'}`}>
          {vaccineData.length > 0 ? (
            <PatientBarGraph labels={labels} dataValues={dataValues} />
          ) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 h-full flex flex-col items-center justify-center">
              <svg className="w-20 h-20 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-gray-500 font-medium text-center">No hay datos de vacunas disponibles</p>
              <p className="text-gray-400 text-sm mt-2 text-center">Los datos aparecerán aquí cuando haya pacientes vacunados</p>
            </div>
          )}
        </div>
        
        {/* Gráfica de dona */}
        <div className={`w-full lg:w-[45%] h-[400px] transition-opacity duration-200 ${isAlcoholStale ? 'opacity-60' : 'opacity-100'}`}>
          {deferredAlcoholData?.distribution !== undefined && deferredAlcoholData?.statistics?.totalRecords > 0 ? (
            <PatientDonaPatients 
              data={deferredAlcoholData} 
              totalCases={deferredAlcoholData.statistics.totalRecords}
            />
          ) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 h-full flex flex-col items-center justify-center">
              <svg className="w-20 h-20 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              <p className="text-gray-500 font-medium text-center">No hay datos de alcoholemia disponibles</p>
              <p className="text-gray-400 text-sm mt-2 text-center">Los datos aparecerán aquí cuando haya registros</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default PatientsRegisters;