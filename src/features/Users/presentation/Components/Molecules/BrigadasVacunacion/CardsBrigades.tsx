import style from "../../Molecules/RegistroBrigadasVacunacion/brigades.module.css"
import calender from "../../../../../../assets/calender.png"
import time from "../../../../../../assets/reloj.png"
import enfermeros from "../../../../../../assets/enfermeros.png"
import vacunas from "../../../../../../assets/vacunas.png"
import ubicacion from "../../../../../../assets/ubication.png"
import { useNavigate } from "react-router-dom"
function CardsBrigades() {
  const navigate = useNavigate();
    const brigadas = [
  {
    nombreBrigada: "Brigada Norte",
    fecha: "2025-07-15",
    horarioInicio: "08:00",
    horarioFin: "16:00",
    lugar: "Centro de Salud La Esperanza",
    cantidadEnfermeros: 5,
    cantidadVacunas: 320,
  },
  {
    nombreBrigada: "Brigada Rural Oriente",
    fecha: "2025-07-16",
    horarioInicio: "09:00",
    horarioFin: "15:00",
    lugar: "Unidad Médica El Zapote",
    cantidadEnfermeros: 3,
    cantidadVacunas: 180,
  },
  {
    nombreBrigada: "Brigada Escolar Sur",
    fecha: "2025-07-17",
    horarioInicio: "07:30",
    horarioFin: "14:00",
    lugar: "Escuela Primaria Benito Juárez",
    cantidadEnfermeros: 4,
    cantidadVacunas: 240,
  },
  {
    nombreBrigada: "Brigada Urbana Centro",
    fecha: "2025-07-18",
    horarioInicio: "10:00",
    horarioFin: "17:00",
    lugar: "Hospital Comunitario Central",
    cantidadEnfermeros: 6,
    cantidadVacunas: 400,
  },
  {
    nombreBrigada: "Brigada Móvil Regional",
    fecha: "2025-07-19",
    horarioInicio: "08:30",
    horarioFin: "13:30",
    lugar: "Plaza Municipal Santa Rosa",
    cantidadEnfermeros: 2,
    cantidadVacunas: 150,
  }
];

const addBrigade = ()=>{
    navigate("/dashboard/registro-brigadas/administrador")
}

    return ( 
        <>
        <div className="mt-10 mx-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
  <p className="text-2xl text-[#00000081]" id={style.title1}>
    Brigadas de vacunación
  </p>

  <button
    onClick={addBrigade}
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
          <img src={calender} alt="calendar" className="w-4 h-4" />
          <span>{brigada.fecha}</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={time} alt="clock" className="w-4 h-4" />
          <span>{brigada.horarioInicio} - {brigada.horarioFin}</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={ubicacion} alt="location" className="w-4 h-4" />
          <span>{brigada.lugar}</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={enfermeros} alt="nurses" className="w-4 h-4" />
          <span>{brigada.cantidadEnfermeros} enfermeros</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={vacunas} alt="vaccines" className="w-4 h-4" />
          <span>{brigada.cantidadVacunas} vacunas</span>
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