import style from "../../Molecules/RegistroBrigadasVacunacion/brigades.module.css"
import calender from "../../../../../../assets/calender.png"
import time from "../../../../../../assets/reloj.png"
import enfermeros from "../../../../../../assets/enfermeros.png"
import vacunas from "../../../../../../assets/vacunas.png"
import ubicacion from "../../../../../../assets/ubication.png"
import location from "../../../../../../assets/location.png"
import { useNavigate } from "react-router-dom"
import { useModalBrigades } from "../RegistroBrigadasVacunacion/ModalBrigadesContext"
function CardsBrigades() {
  const {abrirModal} = useModalBrigades()
 const brigadas = [
  {
    nombreBrigada: "Brigada Norte",
    lugar: "Centro de Salud La Esperanza",
    referenciaLugar: "Ubicado en la zona norte de la ciudad, cerca del parque central.",
  },
  {
    nombreBrigada: "Brigada Rural Oriente",
    lugar: "Unidad Médica El Zapote",
    referenciaLugar: "Instalaciones médicas en la comunidad rural de El Zapote.",
  },
  {
    nombreBrigada: "Brigada Escolar Sur",
    lugar: "Escuela Primaria Benito Juárez",
    referenciaLugar: "Escuela ubicada al sur de la ciudad, junto al campo deportivo.",
  },
  {
    nombreBrigada: "Brigada Urbana Centro",
    lugar: "Hospital Comunitario Central",
    referenciaLugar: "Hospital en el centro de la ciudad, frente a la plaza principal.",
  },
  {
    nombreBrigada: "Brigada Móvil Regional",
    lugar: "Plaza Municipal Santa Rosa",
    referenciaLugar: "Plaza pública en Santa Rosa, punto de reunión comunitaria.",
  }
];


    return ( 
        <>
        <div className="mt-10 mx-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
  <p className="text-2xl text-[#00000081]" id={style.title1}>
    Brigadas de vacunación
  </p>

  <button
    onClick={abrirModal}
    className="bg-[#089ea1] text-white py-3 px-5 sm:px-7 rounded hover:bg-[#0dbfbe] transition cursor-pointer w-full sm:w-auto"
  >
    Agregar brigada
  </button>
</div>


<main id={style.containerGrid} className="mt-5">
  {brigadas.map((brigada, index) => (
    <div key={index} id={style.card}>
      {/* Bolita superior decorativa */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#53999e] h-6 w-6 rounded-full shadow-md"></div>

      {/* Título */}
      <p className="text-lg font-semibold text-gray-800 mb-3">{brigada.nombreBrigada}</p>

      {/* Datos con íconos */}
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <img src={ubicacion} alt="location" className="w-4 h-4" />
          <span>{brigada.lugar}</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={location} alt="nurses" className="w-4 h-4 opacity-35" />
          <span>{brigada.referenciaLugar}</span>
        </div>
      </div>

      {/* Botones */}
      <div className="mt-5 flex flex-col sm:flex-row justify-between gap-3">
  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md text-sm hover:bg-yellow-200 transition w-full sm:w-auto">
    <i className="fas fa-edit"></i> Editar
  </button>
  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-rose-200 text-rose-800 rounded-md text-sm hover:bg-rose-300 transition w-full sm:w-auto">
    <i className="fas fa-trash-alt"></i> Eliminar
  </button>
</div>

    </div>
  ))}
</main>




        </>
    );
}
export default CardsBrigades;