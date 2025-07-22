import { useNavigate } from "react-router-dom";
import style from "../../Molecules/RegistroBrigadasVacunacion/brigades.module.css"
function CardGroups() {
    const navigate = useNavigate();
    const grupos = [
  {
    nameGroup: "Grupo A - Promotores de Salud",
    date: "2025-07-12",
  },
  {
    nameGroup: "Grupo B - Voluntarios Rurales",
    date: "2025-07-13",
  },
  {
    nameGroup: "Grupo C - Estudiantes de Enfermería",
    date: "2025-07-14",
  },
  {
    nameGroup: "Grupo D - Personal Médico Urbano",
    date: "2025-07-15",
  },
  {
    nameGroup: "Grupo E - Brigada Juvenil",
    date: "2025-07-16",
  }
];

const addBrigade = ()=>{
    navigate("/dashboard/grupo/registrar/administrador")
}

    return ( 
        <>
            <div className="mt-10 mx-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pr-5 pl-5">
                <p className="text-2xl text-[#00000081]" id={style.title1}>
                    Grupos
                </p>

            <button
                onClick={addBrigade}
                className="bg-[#089ea1] text-white py-3 px-5 sm:px-7 rounded hover:bg-[#0dbfbe] transition cursor-pointer w-full sm:w-auto"
            >
                Agregar grupo
            </button>
            </div>

            <main id={style.containerGrid} className="mt-5">
  {grupos.map((brigada, index) => (
    <div key={index} id={style.card}>
      {/* Bolita superior decorativa */}

      {/* Título */}
      <p className="text-lg font-semibold text-gray-800 mb-3 z-20">{brigada.nameGroup}</p>

      {/* Datos con íconos */}
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span>{brigada.nameGroup}</span>
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

export default CardGroups;