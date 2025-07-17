import termometroIcon from "../../../../../../assets/termometroIcon.png"
import copa from "../../../../../../assets/copIcon.png"
import style from "../../Molecules/HistorialVacunacionPaciente/main.module.css"
import styled from "../../Molecules/HealtStatus/Healt.module.css"
function MainStatusHealt() {
    return ( 
        <>
        <div className="mt-10">
            <p className="text-2xl text-[#00000081] ml-4 sm:ml-7"
            id={styled.title}>Resumen de salud de la ultima dosis</p>
        </div>

        <section className="ml-7 sm:ml-7 mt-7 flex  sm:gap-10">
            <div className="w-[40vh] h-[11vh] sm:h-[11vh] bg-white rounded-2xl 
            flex  gap-10 p-3" id={style.card1}> 
                    <div className="space-y-1">
                        <div className="flex gap-3">
                        <p className="text-[2.7vh] text-[#3f3c3c7b] font-medium sm:text-[2.1vh]">Temperatura promedio</p>
                        <img src={termometroIcon} alt="" className="w-5 h-5"/>
                        </div>
                        <p className="text-[2vh] text-[#2ce432] font-medium sm:text-[2.4vh]">36.5°</p>
                    </div>    
            </div>

            <div className="w-[40vh] h-[11vh] bg-white rounded-2xl 
            flex  gap-10 p-3" id={style.card2}> 
                    <div className="space-y-1">
                        <div className="flex gap-3">
                        <p className="text-[2.7vh] text-[#3f3c3c7b] font-medium sm:text-[2.1vh]">Alcoholemia</p>
                        <img src={copa} alt="" className="w-5 h-5"/>
                        </div>
                        <p className="text-[2vh] text-[#e1b532] font-medium sm:text-[2.4vh]">0.2%</p>
                    </div>    
            </div>
        </section>
        </>
     );
}

export default MainStatusHealt;