import TableVaccines from "../../Molecules/GestionVacunas/tableVaccines";
import VaccineInventoryBarChart from "../../Molecules/GestionVacunas/VaccineInventoryBarChart";
import { useGetVaccineAmount } from "../../../../User/Presentation/Hooks/useGetVaccineAmount";

function TableVaccinesRegister() {

  return (
    <>
      <TableVaccines />
    </>
  );
}

export default TableVaccinesRegister;
