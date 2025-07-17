import ResumenVaccination from "../../Molecules/HistorialVacunacionPaciente/resumenVaccination";
import TablePatients from "../../Molecules/HistorialVacunacionPaciente/tablePatients";
import VaccinationHistoryCards from "../../Molecules/HistorialVacunacionPaciente/vaccinationHistoryCards";

function MainHistorialVacunation() {
    return ( 
        <>
            <div className="mt-6">
                            <VaccinationHistoryCards></VaccinationHistoryCards>
                        </div>
                        
                        <div className="flex-none pl-3 pr-3 gap-0 sm:gap-10 sm:pl-7 sm:pr-7 sm:flex mt-3 ">
                            <TablePatients></TablePatients>
                            {/**<ResumenVaccination></ResumenVaccination>**/}
                        </div>
        </>
     );
}

export default MainHistorialVacunation;