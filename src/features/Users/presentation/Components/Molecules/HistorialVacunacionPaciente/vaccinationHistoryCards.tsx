import style from "../../Molecules/HistorialVacunacionPaciente/main.module.css"
import vaccineApplys from "../../../../../../assets/vaccinesApplysLogo.png"
import nextDosis from "../../../../../../assets/nextDosisLogo.png"
import ultimeDosis from "../../../../../../assets/lastDosisLogo.png"
import calender from "../../../../../../assets/calenderLogo.png"

function VaccinationHistoryCards() {
    return ( 
        <>
            <div className="mt-6 px-4 sm:px-7">
                <p className="text-2xl font-bold text-gray-800">Historial de vacunación</p>
            </div>

            <section className="flex flex-wrap gap-4 mt-6 px-4 sm:px-7">
                {/* Card 1 - Vacunas aplicadas */}
                <div className="min-w-[240px] flex-1 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-4xl font-bold text-gray-800 mb-1">10</p>
                            <p className="text-xs text-gray-600 font-medium">Vacunas aplicadas</p>
                        </div>
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                            <img src={vaccineApplys} alt="" className="w-8 h-8"/>
                        </div>
                    </div>
                </div>

                {/* Card 2 - Última dosis */}
                <div className="min-w-[240px] flex-1 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-gray-800 mb-1 truncate">Vaxigrip...</p>
                            <p className="text-xs text-gray-600 font-medium">Ultima dosis</p>
                        </div>
                        <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                            <img src={ultimeDosis} alt="" className="w-8 h-8"/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default VaccinationHistoryCards;