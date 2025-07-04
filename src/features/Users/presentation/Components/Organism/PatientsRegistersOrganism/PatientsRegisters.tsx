import GraphTemperatureCooler from "../../Molecules/PacientesRegistrados/graphTemperatureCooler";
import InventoryCards from "../../Molecules/PacientesRegistrados/InventoryCards";
import TablePatientsRegister from "../../Molecules/PacientesRegistrados/tablePatientsRegisters";

const labels = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const temperatures = [23, 26, 25, 28, 24];
function PatientsRegisters() {
    return ( 
        <>
            <TablePatientsRegister></TablePatientsRegister>
            <div className="flex-none mt-3 gap-6 sm:flex">
            <GraphTemperatureCooler labels={labels} temperatures={temperatures}></GraphTemperatureCooler>
            <InventoryCards></InventoryCards>
            </div>
        </>
     );
}

export default PatientsRegisters;