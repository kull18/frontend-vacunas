import { useNavigate } from "react-router-dom";
import style from "../../Molecules/RegistroBrigadasVacunacion/brigades.module.css"
import { useGetGroup } from "../../../../Group/Presentation/Hooks/useGetGroups";
function CardGroups() {
    const navigate = useNavigate();
    const { group, loadingGroup, errorGroup } = useGetGroup();


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
  {group.map((group, index) => (
    <div key={index} id={style.card}>
      {/* Bolita superior decorativa */}

      {/* Título */}
      <p className="text-lg font-semibold text-gray-800 mb-3 z-20">{group.nameGroup}</p>

      {/* Datos con íconos */}
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span>{group.dateGroup}</span>
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