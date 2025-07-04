import GraphTemperature from "../../Molecules/PacientesRegistrados/graphTemperature";
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
            <div className="flex-none mt-3 gap-6 sm:flex">
                <GraphTemperature labels={temperature.labels} temperatures={temperature.values}></GraphTemperature>
                <GraphHumidity labels={humidity.labels} humidity={humidity.values} ></GraphHumidity>
                <InventoryCards></InventoryCards>
            </div>
        </>
    );
}

export default PatientsRegisters;