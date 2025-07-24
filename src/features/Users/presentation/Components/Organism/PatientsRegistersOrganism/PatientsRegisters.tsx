import { useGetAlcohol } from "../../../../User/Presentation/Hooks/useGetAlcoholemia";
import PatientAgeHistogram from "../../Molecules/PacientesRegistrados/PatientAgeHistogram";
import PatientBarGraph from "../../Molecules/PacientesRegistrados/PatientBarGraph";
import PatientDonaPatients from "../../Molecules/PacientesRegistrados/PatientDonaPatients";
import TablePatientsRegister from "../../Molecules/PacientesRegistrados/tablePatientsRegisters";

function PatientsRegisters() {
  const { data: dataAlcohol = [] } = useGetAlcohol();

  const data = {
    labels: ['Pfizer', 'Moderna', 'AstraZeneca', 'Sinovac', 'Sputnik V', 'Johnson & Johnson'],
    dataValues: [250, 180, 100, 80, 60, 40],
  };

  type AgeGroupData = {
    label: string;
    count: number;
  };

  const ageGroups: AgeGroupData[] = [
    { label: '0–18', count: 5 },
    { label: '19–30', count: 12 },
    { label: '31–50', count: 18 },
    { label: '51+', count: 7 },
  ];

  return (
    <>
      <TablePatientsRegister />
      <div className="flex flex-col sm:flex-row gap-14 ml-3">
        <div className="ml-2 mt-8 sm:ml-10 sm:mt-10">
          <PatientBarGraph labels={data.labels} dataValues={data.dataValues} />
        </div>
        <div className="mt-10">
          {/* 🔁 Le pasamos los datos con probabilidad directamente */}
          <PatientDonaPatients data={dataAlcohol} />
        </div>
      </div>
    </>
  );
}

export default PatientsRegisters;
