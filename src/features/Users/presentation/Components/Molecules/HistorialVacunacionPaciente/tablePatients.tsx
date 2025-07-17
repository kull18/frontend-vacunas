import style from "../../Molecules/HistorialVacunacionPaciente/main.module.css"
import download from "../../../../../../assets/downloadLogo.png"
import { FilePatient } from "../../Pdf/filePatient";
function TablePatients() {
    const historial = [
  {
    id: 1,
    fecha: "15/06/2025",
    vacuna: "Alzheimer",
    enfermero: "David Reynold Guzmán Castro",
  },
  {
    id: 2,
    fecha: "16/06/2025",
    vacuna: "Influenza Quadrivalente",
    enfermero: "María Fernanda Morales",
  },
  {
    id: 3,
    fecha: "17/06/2025",
    vacuna: "Hepatitis B Recombinante",
    enfermero: "Luis Antonio Herrera",
  },
  {
    id: 4,
    fecha: "18/06/2025",
    vacuna: "SARS-CoV-2 Variante XBB",
    enfermero: "Carla Gómez Castañeda",
  },
  {
    id: 5,
    fecha: "19/06/2025",
    vacuna: "Tdap",
    enfermero: "Joel Martínez Robledo",
  },
  {
    id: 6,
    fecha: "20/06/2025",
    vacuna: "Neumocócica Conjugada PCV13",
    enfermero: "Daniela Ramos Rivera",
  },
];

    return ( 
        <>
        <main>
        <div className="mt-10">
            <p className="text-2xl text-[#00000081]" id={style.title2}>Historial completo</p>
        </div>

        <div className="overflow-x-auto w-full mt-6 max-h-[30vh]" id={style.tablet}>
        <table className="w-full border border-gray-300">
            <thead className="bg-[#F4F4F4] sticky top-0 z-10">
            <tr className="border-b border-gray-300">
                <th className="px-6 py-3 text-left">Fecha</th>
                <th className="px-6 py-3 text-left">Vacuna (lote)</th>
                <th className="px-6 py-3 text-left">Enfermero/a</th>
                <th className="px-6 py-3 text-left">Certificado</th>
            </tr>
            </thead>

    <tbody>
      {historial.map((registro) => (
        <tr key={registro.id} className="border-b border-gray-300">
          <td className="px-6 py-3">{registro.fecha}</td>
          <td className="px-6 py-3">{registro.vacuna.toUpperCase().slice(0, 3)}23NC83JD</td>
          <td className="px-6 py-3">{registro.enfermero}</td>
          <td className="px-6 py-3" >
            <button
            className="bg-[#1677FF] text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-[#1677ffd6] duration-200"
            onClick={() =>
              FilePatient({
                nombre: registro.enfermero,
                dosis: registro.vacuna,
                fecha: registro.fecha,
              })

            }
          >
            Descargar
          </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </main>
        </>
    );
}

export default TablePatients;