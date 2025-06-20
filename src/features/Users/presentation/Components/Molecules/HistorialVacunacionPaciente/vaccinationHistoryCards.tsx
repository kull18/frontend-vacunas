import style from "../../Molecules/HistorialVacunacionPaciente/main.module.css"
import vaccineApplys from "../../../../../../assets/vaccinesApplysLogo.png"
import nextDosis from "../../../../../../assets/nextDosisLogo.png"
import ultimeDosis from "../../../../../../assets/lastDosisLogo.png"
import calender from "../../../../../../assets/calenderLogo.png"
function VaccinationHistoryCards() {
    return ( 
        <>
        <div className="mt-10">
            <p className="text-2xl text-[#00000081] ml-2 sm:ml-7">Historial de vacunación</p>
        </div>

        <section className="flex ml-6 gap-4 mt-6" id={style.section}>
            <div className="w-[40vh] h-[15vh] bg-white rounded-2xl 
            flex justify-center items-center gap-10" id={style.card}> 
                    <div className="">
                        <p className="text-4xl text-[#3f3c3cc5] sm:text-[4.3vh]" id={style.text}>10</p>
                        <p className="text-[1.6vh] text-[#0000009e] sm:text-[2.4vh]">Vacunas aplicadas</p>
                    </div>
                    <div className="w-16 h-16 bg-[#60BDE4] rounded-2xl flex justify-center items-center">
                        <img src={vaccineApplys} alt="" className="w-12 h-12"/>
                    </div>     
            </div>

            <div className="w-[40vh] h-[15vh] bg-white rounded-2xl 
            flex justify-center items-center gap-10" id={style.card}>
                    <div className="space-y-2">
                        <p className="text-4xl text-[#3f3c3cc5] sm:text-[4.3vh]" id={style.text}>3</p>
                        <p className="text-[1.6vh] text-[#0000009e] sm:text-[2.4vh]">Proxima dosis(dias)</p>
                    </div>
                    <div className="w-16 h-16 bg-[#FFD700] rounded-2xl flex justify-center items-center">
                        <img src={nextDosis} alt="" className="w-12 h-12"/>
                    </div>
            </div>

            <div className="w-[40vh] h-[15vh] bg-white rounded-2xl 
            flex justify-center items-center gap-10" id={style.card}>
                    <div className="space-y-2">
                        <p className="text-[2.5vh] text-[#3f3c3cc5] sm:text-[3.8vh]" id={style.text}>Vaxigrip...</p>
                        <p className="text-[1.6vh] text-[#0000009e] sm:text-[2.4vh]">Ultima dosis</p>
                    </div>
                    <div className="w-16 h-16 bg-[#4CAF50] rounded-2xl flex justify-center items-center">
                        <img src={ultimeDosis} alt="" className="w-12 h-12"/>
                        </div>
            </div>

            <div className="w-[40vh] h-[15vh] bg-white rounded-2xl 
            flex justify-center items-center gap-10" id={style.card}>
                    <div className="space-y-2">
                        <p className="text-[2.2vh] text-[#3f3c3cc5] sm:text-[3.7vh]" id={style.text}>17/06/2025</p>
                        <p className="text-[1.6vh] text-[#0000009e] sm:text-[2.4vh]">Fecha actual</p>
                    </div>
                    <div className="w-16 h-16 bg-[#AF564C] rounded-2xl flex justify-center items-center">
                        <img src={calender} alt="" className="w-12 h-12"/>
                    </div>
            </div>
        </section>
        </>
    );
}

export default VaccinationHistoryCards;