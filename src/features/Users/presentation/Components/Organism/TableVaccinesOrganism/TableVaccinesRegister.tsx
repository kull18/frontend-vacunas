import TableVaccines from "../../Molecules/GestionVacunas/tableVaccines";
import VaccineInventoryBarChart from "../../Molecules/GestionVacunas/VaccineInventoryBarChart";
import { useGetVaccineAmount } from "../../../../User/Presentation/Hooks/useGetVaccineAmount";

function TableVaccinesRegister() {
  const { data: dataVaccine } = useGetVaccineAmount();

  console.log("data amoun from vaccines",dataVaccine)

  // Validación: Si no hay datos aún (loading o error), no intentar mapear
  const labelsInventory = dataVaccine?.map(item => item.nameVaccine) || [];
  const dataValuesInventory = dataVaccine?.map(item => item.availableDoses) || [];

  return (
    <>
      <TableVaccines />
    </>
  );
}

export default TableVaccinesRegister;
