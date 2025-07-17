import gota from "../../../../../../assets/gotaBlueIcon.png"
import vacuna from "../../../../../../assets/vacunaBlueIcon.png"
import alerta from "../../../../../../assets/alertaIcon.png"
import file from "../../../../../../assets/file.png"
import print from "../../../../../../assets/print.png"
import ActionsFast from "./ActionsFast"
import styled from "../../Molecules/HealtStatus/Healt.module.css"
function HealtTips() {
    return ( 
        <>
        <div className="mt-10">
            <p className="text-2xl text-[#00000081] ml-7" id={styled.titleConsejo}>Consejos de salud</p>
        </div>

<div className="flex-none sm:flex">
    <div className="flex flex-wrap gap-5 px-7 mt-6">
            {/* Card Hidratación */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border 
            border-gray-200 transition-all duration-300 hover:shadow-lg 
            hover:-translate-y-1 flex-1 min-w-[280px] sm:min-w-[140px] 
            sm:max-w-[260px]" id={styled.consejo1}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex items-center gap-2">
                        <img src={gota} alt="Hidratación" className="w-5 h-5" />
                        <span className="text-lg font-semibold text-gray-800">Hidratación</span>
                    </div>
                </div>
                <div className="text-gray-600 text-[15px] leading-relaxed">
                    Bebe 2L de agua diarios (tu promedio: 1.3L)
                </div>
            </div>

            {/* Card Próxima vacuna */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border 
            border-gray-200 transition-all duration-300 hover:shadow-lg 
            hover:-translate-y-1 flex-1 min-w-[280px] sm:min-w-[140px] 
            sm:max-w-[260px]" id={styled.consejo2}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div className="flex items-center gap-2">
                        <img src={vacuna} alt="Vacuna" className="w-5 h-5" />
                        <span className="text-lg font-semibold text-gray-800">Próxima vacuna</span>
                    </div>
                </div>
                <div className="text-gray-600 text-[15px] leading-relaxed">
                    Refuerzo de Pfizer en 3 días
                </div>
            </div>

            {/* Card Alerta */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border 
            border-gray-200 transition-all duration-300 hover:shadow-lg 
            hover:-translate-y-1 flex-1 min-w-[280px] sm:min-w-[140px] 
            sm:max-w-[260px]" id={styled.consejo3}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="flex items-center gap-2">
                        <img src={alerta} alt="Alerta" className="w-5 h-5" />
                        <span className="text-lg font-semibold text-gray-800">Alerta</span>
                    </div>
                </div>
                <div className="text-gray-600 text-[15px] leading-relaxed">
                    Evita alcohol 48h antes de tu próxima dosis
                </div>
            </div>
    </div>

    <div className="flex justify-center mt-5 sm:mt-0">
        <ActionsFast></ActionsFast>
    </div>
</div>
        </>
     );
}

export default HealtTips;