import BarChartHealtStatus from "./BarChartHealtStatus";
import LineChartHealtStatus from "./LineChartHealtStatus";
import style from "../HealtStatus/Healt.module.css"
import { useWebSocket } from "../../../../../../shared/HumidityProvider";

function GraphsHealtStatus() {
    const { messages } = useWebSocket();

    const glucoseData = {
        labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
        values: messages,
    };

    const symptomsData = {
        labels: ["Dolor", "Fatiga", "Náuseas"],
        values: [3, 5, 2],
    };
    return ( 
        <>
        <div className="mt-10">
            <p className="text-2xl text-[#00000081] ml-7">Evolución de mi salud</p>
        </div>
        <div className="flex sm:flex-row flex-wrap">
            <div className="w-[50vh] h-[40vh] sm:w-[80vh] sm:h-[40vh]" id={style.lineChart}>
            <LineChartHealtStatus labels={glucoseData.labels} dataValues={glucoseData.values}></LineChartHealtStatus>
            </div>

            <div className="w-[50vh] h-[40vh] sm:w-[80vh] sm:h-[40vh]" id={style.BarChart}>
            <BarChartHealtStatus labels={symptomsData.labels} dataValues={glucoseData.values}></BarChartHealtStatus>
            </div>
        </div>
        </>
     );
}

export default GraphsHealtStatus;