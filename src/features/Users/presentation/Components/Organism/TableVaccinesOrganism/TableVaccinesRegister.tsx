import { data } from "react-router-dom";
import TableVaccines from "../../Molecules/GestionVacunas/tableVaccines";
import VaccineBarChart from "../../Molecules/GestionVacunas/VaccineBarChart";
import VaccineInventoryBarChart from "../../Molecules/GestionVacunas/VaccineInventoryBarChart";

function TableVaccinesRegister() {
    const data= [
        { nameVaccine: 'Pfizer', doses: 1000 },
        { nameVaccine: 'Moderna', doses: 800 },
        { nameVaccine: 'AstraZeneca', doses: 600 },
        { nameVaccine: 'Johnson & Johnson', doses: 400 },
        { nameVaccine: 'Sinovac', doses: 300 },
        { nameVaccine: 'Sputnik V', doses: 200 },
        { nameVaccine: 'Novavax', doses: 150 },
        { nameVaccine: 'Covaxin', doses: 100 },
    ]

    const dataVaccinesInventory = [
        { nameVaccine: 'Pfizer', doses: 1000 },
        { nameVaccine: 'Moderna', doses: 800 },
        { nameVaccine: 'AstraZeneca', doses: 600 },
        { nameVaccine: 'Johnson & Johnson', doses: 400 },
        { nameVaccine: 'Sinovac', doses: 300 },
        { nameVaccine: 'Sputnik V', doses: 200 },
        { nameVaccine: 'Novavax', doses: 150 },
    ]

    const labels = data.map(item => item.nameVaccine);
    const dataValues = data.map(item => item.doses);

    const labelsInventory = dataVaccinesInventory.map(item => item.nameVaccine);
    const dataValuesInventory = dataVaccinesInventory.map(item => item.doses);
    return ( 
        <>
            <TableVaccines></TableVaccines>
            <div className="flex flex-col sm:flex-row items-center mt-10 gap-5 ml-0 sm:ml-10 pb-10">
            <VaccineBarChart labels={labels} dataValues={dataValues}></VaccineBarChart>
            <VaccineInventoryBarChart labels={labelsInventory} dataValues={dataValuesInventory}></VaccineInventoryBarChart>
            </div>
        </>
    );
}

export default TableVaccinesRegister;