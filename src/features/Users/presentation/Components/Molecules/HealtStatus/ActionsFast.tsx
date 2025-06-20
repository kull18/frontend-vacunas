import file from "../../../../../../assets/file.png"
import print from "../../../../../../assets/print.png"
function ActionsFast() {
    return ( 
        <>
<div className="w-[340px] sm:w-[260px] bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-[#0000008b] mb-6">Acciones rápidas</h3>
            
            <div className="flex flex-col gap-4">
                {/* Botón Exportar reporte */}
                <button className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <img src={file} alt="Exportar" className="w-5 h-5 z-10" />
                    <span className="z-10">Exportar reporte</span>
                </button>

                {/* Botón Imprimir resumen */}
                <button className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <img src={print} alt="Imprimir" className="w-5 h-5 z-10" />
                    <span className="z-10">Imprimir resumen</span>
                </button>
            </div>
        </div>
        </>
     );
}

export default ActionsFast;