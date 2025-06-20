import style from "../../Molecules/HistorialVacunacionPaciente/main.module.css"
import termometro from "../../../../../../assets/termometroIcon.png"
import coap from "../../../../../../assets/copIcon.png"
import pendingVaccine from "../../../../../../assets/pendingVaccine.png"
function ResumenVaccination() {
    return ( 
        <>
        <main>
            <div className="mt-10">
                <p className="text-2xl text-[#00000081]">Resumen de vacunación</p>
            </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between w-full sm:w-[32vh] sm:flex-1 sm:h-[16vh]">
            <div className="flex flex-col gap-2">
                <p className="text-gray-600 text-sm">Última vacuna</p>
                <div className="flex items-center gap-2">
                    <img src={termometro} alt="icon" className="w-5 h-5" />
                    <p className="text-[#4CAF50] font-medium">Pfizer (15/06/2025)</p>
                </div>
            </div>
            <p className="text-[#43AAF4] text-sm font-semibold cursor-pointer mt-2">Ver detalles</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between w-full sm:w-[32vh] sm:flex-1 sm:h-[16vh]">
            <div className="flex flex-col gap-2">
                <p className="text-gray-600 text-sm">Próxima</p>
                <div className="flex items-center gap-2">
                    <img src={coap} alt="icon" className="w-5 h-5" />
                    <p className="text-[#CDB15E] font-medium">3 días restantes</p>
                </div>
            </div>
            <p className="text-[#43AAF4] text-sm font-semibold cursor-pointer mt-2">Agregar recordatorio</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between w-full sm:w-[32vh] sm:flex-1 sm:h-[15vh]">
            <div className="flex flex-col gap-2">
                <p className="text-gray-600 text-sm">Vacunas pendientes</p>
                <div className="flex items-center gap-2">
                    <img src={pendingVaccine} alt="icon" className="w-5 h-5" />
                    <p className="text-[#EA6A6A] font-medium">1 vacuna</p>
                </div>
            </div>
        </div>
    </div>

        </main>
        </>
    );
}

export default ResumenVaccination;