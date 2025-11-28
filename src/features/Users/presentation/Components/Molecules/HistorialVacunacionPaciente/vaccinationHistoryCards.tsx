// Molecules/HistorialVacunacionPaciente/vaccinationHistoryCards.tsx
import { useGetPatientVaccines } from "../../../../User/Presentation/Hooks/useGetPatientVaccines";
import { useLoginUser } from "../../../../User/Presentation/Hooks/useLoginUsers";
import vaccineApplys from "../../../../../../assets/vaccinesApplysLogo.png";
import nextDosis from "../../../../../../assets/nextDosisLogo.png";
import ultimeDosis from "../../../../../../assets/lastDosisLogo.png";
import calender from "../../../../../../assets/calenderLogo.png";

function VaccinationHistoryCards() {
    const { loggedUser } = useLoginUser();

    console.log("log user", loggedUser)
    const { data: patientData, loading } = useGetPatientVaccines(loggedUser?.idUserCivil ?? null);

    // Obtener la última vacuna aplicada
    const lastVaccination = patientData?.vaccinations?.[0]; // Ya vienen ordenadas por fecha desc
    const totalVaccines = patientData?.totalVaccinations ?? 0;
    const uniqueVaccines = patientData?.summary.uniqueVaccines ?? 0;

    if (loading) {
        return (
            <div className="animate-pulse px-4 sm:px-7">
                <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
                <section className="flex flex-wrap gap-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="min-w-[240px] flex-1 bg-gray-100 rounded-xl h-24"></div>
                    ))}
                </section>
            </div>
        );
    }

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
                            <p className="text-4xl font-bold text-gray-800 mb-1">
                                {totalVaccines}
                            </p>
                            <p className="text-xs text-gray-600 font-medium">
                                Vacunas aplicadas
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {uniqueVaccines} {uniqueVaccines === 1 ? 'tipo' : 'tipos'} diferentes
                            </p>
                        </div>
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                            <img src={vaccineApplys} alt="Vacunas aplicadas" className="w-8 h-8"/>
                        </div>
                    </div>
                </div>

                {/* Card 2 - Última dosis */}
                <div className="min-w-[240px] flex-1 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 overflow-hidden">
                            <p className="text-2xl font-bold text-gray-800 mb-1 truncate" title={lastVaccination?.vaccine.name || 'Sin registro'}>
                                {lastVaccination?.vaccine.name || 'N/A'}
                            </p>
                            <p className="text-xs text-gray-600 font-medium">
                                Última dosis
                            </p>
                            {lastVaccination?.date && (
                                <p className="text-xs text-gray-500 mt-1">
                                    {new Date(lastVaccination.date).toLocaleDateString('es-MX', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </p>
                            )}
                        </div>
                        <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                            <img src={ultimeDosis} alt="Última dosis" className="w-8 h-8"/>
                        </div>
                    </div>
                </div>

                {/* Card 3 - Próxima dosis (Bonus) */}
                <div className="min-w-[240px] flex-1 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 border border-gray-100 opacity-50">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-gray-800 mb-1">
                                Próximamente
                            </p>
                            <p className="text-xs text-gray-600 font-medium">
                                Próxima dosis
                            </p>
                        </div>
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                            <img src={calender} alt="Próxima dosis" className="w-8 h-8"/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default VaccinationHistoryCards;