import PatientBarGraph from "../../Molecules/PacientesRegistrados/PatientBarGraph";
import PatientDonaPatients from "../../Molecules/PacientesRegistrados/PatientDonaPatients";
import TablePatientsRegister from "../../Molecules/PacientesRegistrados/tablePatientsRegisters";
import { useGetUserCivilsValues } from "../../../../User/Presentation/Hooks/useGetUserCivilVaccinatedValues";
import { useGetAlcohol } from "../../../../User/Presentation/Hooks/useGetAlcoholemia";
import NormalDistributionChart from "../../Molecules/GausGraph/GaussJordanMatrixChart";
import { useGetSensorCheckDataValues } from "../../../../User/Presentation/Hooks/useGetSensorCheckDataValues";
import NormalDistributionChartEmpty from "../../Molecules/GausGraph/GaussJordanEmpty";
import { UserCivilStatsProvider } from "../../Molecules/PacientesRegistrados/useUserCivilStats";
import { useUserCivil } from "../../../../../../shared/useCivilProvider";

function PatientsRegisters() {
  const { userCivilValues } = useGetUserCivilsValues();
  const { userCivilData } = useUserCivil();

  
  const { data: alcoholData } = useGetAlcohol();
  const { data: SensorCheck } = useGetSensorCheckDataValues();

  const stillLoading = !userCivilValues || !alcoholData || !SensorCheck;


  console.log("data from sensor chcck", SensorCheck)

  if (stillLoading) {
    return <div>Cargando datos...</div>;

    
  }

  console.log("data", SensorCheck)

  const labels = userCivilValues.vaccinations.map((v) => v.vaccine.name);
  const dataValues = labels.map((name) => userCivilValues.vaccineCounts?.[name] ?? 0);

  return (
    <>
      <TablePatientsRegister />

      <div className="flex flex-col sm:flex-row gap-14 ml-3">
        <div className="ml-2 mt-8 sm:ml-10 sm:mt-10">
          <PatientBarGraph labels={labels} dataValues={dataValues} />
        </div>
        <div className="mt-10">
          {alcoholData.length > 0 ? (
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
