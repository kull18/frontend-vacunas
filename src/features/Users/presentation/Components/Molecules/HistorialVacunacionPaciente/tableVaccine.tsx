import style from "../../Molecules/HistorialVacunacionPaciente/main.module.css"
import download from "../../../../../../assets/downloadLogo.png"
function TableVaccine() {
    return ( 
        <>
        <main>
        <div className="mt-10">
            <p className="text-2xl text-[#00000081]" id={style.title2}>Historial completo</p>
        </div>

        <div className="overflow-x-auto w-full mt-6" id={style.tablet}>
            <table className="w-full border border-gray-300">
            <thead className="bg-[#F4F4F4]">
                <tr className="border-b border-gray-300">
                    <th className="px-6 py-3 text-left">Fecha</th>
                    <th className="px-6 py-3 text-left">Vacuna (lote)</th>
                    <th className="px-6 py-3 text-left">Enfermero/a</th>
                    <th className="px-6 py-3 text-left">Certificado</th>
                </tr>
            </thead>

            <tbody>
                <tr className="border-b border-gray-300">
                    <td className="px-6 py-3">15/06/2025</td>
                    <td className="px-6 py-3">323NC83JD</td>
                    <td className="px-6 py-3">Hector Emilio Somer</td>
                    <td className="px-6 py-3">
                        <button className="bg-[#1677FF] text-white px-4 py-2 rounded-2xl 
                        cursor-pointer hover:bg-[#1677ffd6] duration-200">Descargar</button>
                    </td>
                </tr>
                <tr className="border-b border-gray-300">
                    <td className="px-6 py-3">15/06/2025</td>
                    <td className="px-6 py-3">323NC83JD</td>
                    <td className="px-6 py-3">Sergio Adrian Montoya</td>
                    <td className="px-6 py-3">
                        <button className="bg-[#1677FF] text-white px-4 py-2 rounded-2xl 
                        cursor-pointer hover:bg-[#1677ffd6] duration-200">Descargar</button>
                    </td>
                </tr>
                <tr className="border-b border-gray-300">
                    <td className="px-6 py-3">15/06/2025</td>
                    <td className="px-6 py-3">323NC83JD</td>
                    <td className="px-6 py-3">David Guzman Castro</td>
                    <td className="px-6 py-3">
                        <button className="bg-[#1677FF] text-white px-4 py-2 rounded-2xl 
                        cursor-pointer hover:bg-[#1677ffd6] duration-200">Descargar</button>
                    </td>
                </tr>
            </tbody>
        </table>

        </div>
    </main>
        </>
    );
}

export default TableVaccine;