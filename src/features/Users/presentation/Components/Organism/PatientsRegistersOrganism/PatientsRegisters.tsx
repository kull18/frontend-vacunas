import { useVaccineData } from "../../../../../../shared/VaccineDataProvider";
import { useAlcoholData } from "../../../../../../shared/AlcoholDataProvider"; // Asegúrate que este hook exista
import PatientBarGraph from "../../Molecules/PacientesRegistrados/PatientBarGraph";
import PatientDonaPatients from "../../Molecules/PacientesRegistrados/PatientDonaPatients";
import TablePatientsRegister from "../../Molecules/PacientesRegistrados/tablePatientsRegisters";

function PatientsRegisters() {
  const vaccineResponseData = useVaccineData();

  console.log("data vaccine", vaccineResponseData)
  const alcoholData = useAlcoholData();

  console.log("data alcohol", alcoholData)

  const stillLoading = !vaccineResponseData && !alcoholData;

  if (stillLoading) {
    return <div>Cargando datos...</div>;
  }

  const labels = vaccineResponseData?.vaccinations.map((v) => v.vaccine.name) || [];
  const dataValues = labels.map((name) => vaccineResponseData?.vaccineCounts?.[name] ?? 0);

  return (
    <>
      <TablePatientsRegister />
      <div className="flex flex-col sm:flex-row gap-14 ml-3">
        <div className="ml-2 mt-8 sm:ml-10 sm:mt-10">
            <PatientBarGraph labels={labels} dataValues={dataValues} />   
        </div>
        <div className="mt-10">
          {alcoholData && alcoholData.length > 0 ? (
            <PatientDonaPatients data={alcoholData} />
          ) : (
            <div>No hay datos de alcohol aún</div>
          )}
        </div>
      </div>
    </>
  );
}

export default PatientsRegisters;
