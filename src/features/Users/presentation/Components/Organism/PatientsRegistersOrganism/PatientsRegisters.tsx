import GraphTemperatureCooler from "../../Molecules/PacientesRegistrados/graphTemperatureCooler";
import InventoryCards from "../../Molecules/PacientesRegistrados/InventoryCards";
import TablePatientsRegister from "../../Molecules/PacientesRegistrados/tablePatientsRegisters";
import { useWebSocket } from "../../../../../../shared/HumidityProvider";
import GraphHumidity from "../../Molecules/PacientesRegistrados/GraphHumidity";

function PatientsRegisters() {
    const { temperatureData, humidityData } = useWebSocket();

    const labels = temperatureData?.intervalos || [];
    const marcas = temperatureData?.marcas || [];

    const temperature = {
        labels: labels,
        values: marcas,
    };

    const labelsH = humidityData?.intervalos || [];
    const valuesH = humidityData?.intervalos || []


    const humidity = {
        labels: labelsH,
        values: valuesH
    }
    return (
        <>
            <TablePatientsRegister></TablePatientsRegister>
            <div className="flex-none mt-3 sm:flex sm:flex-col">
                <div className="flex gap-10 sm:flex">
                <InventoryCards></InventoryCards>
                <GraphTemperatureCooler labels={labels} temperatures={marcas}></GraphTemperatureCooler>
                </div>
                <div className="flex ml-6 mt-5">
                <GraphHumidity labels={labelsH} humidity={valuesH}></GraphHumidity>
                </div>
            </div>
        </>
    );
}

export default PatientsRegisters;