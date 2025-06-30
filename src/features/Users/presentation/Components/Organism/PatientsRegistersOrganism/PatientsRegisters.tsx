import GraphTemperature from "../../Molecules/PacientesRegistrados/graphTemperature";
import InventoryCards from "../../Molecules/PacientesRegistrados/InventoryCards";
import TablePatientsRegister from "../../Molecules/PacientesRegistrados/tablePatientsRegisters";

const labels = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const temperatures = [23, 26, 25, 28, 24];
function PatientsRegisters() {
    return ( 
        <>
            <TablePatientsRegister></TablePatientsRegister>
            <div className="flex-none mt-3 gap-6 sm:flex">
            <GraphTemperature labels={labels} temperatures={temperatures}></GraphTemperature>
            <InventoryCards></InventoryCards>
            </div>
        </>
     );
}

export default PatientsRegisters;