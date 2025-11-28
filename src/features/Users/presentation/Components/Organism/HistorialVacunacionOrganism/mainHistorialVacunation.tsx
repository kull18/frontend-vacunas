import ResumenVaccination from "../../Molecules/HistorialVacunacionPaciente/resumenVaccination";
import TablePatients from "../../Molecules/HistorialVacunacionPaciente/tablePatients";
import VaccinationHistoryCards from "../../Molecules/HistorialVacunacionPaciente/vaccinationHistoryCards";

function MainHistorialVacunation() {
    return ( 
        <div className="min-h-screen bg-gradient-to-br from-white-50 to-white-100 pb-8">
            <div className="max-w-7xl mx-auto">
                <VaccinationHistoryCards />
                
                <div className="mt-6">
                    <TablePatients />
                </div>
                
                {/**<ResumenVaccination />**/}
            </div>
        </div>
    );
}

export default MainHistorialVacunation;