import { useNavigate } from "react-router-dom";
import style from "../../Molecules/RegistroBrigadasVacunacion/brigades.module.css"
import { useGetGroup } from "../../../../Group/Presentation/Hooks/useGetGroups";
import { GroupRepository } from "../../../../Group/Domain/GroupRepository";
import { useDeleteGroup } from "../../../../Group/Presentation/Hooks/useDeleteGroup";
import Swal from "sweetalert2";
function CardGroups() {
    const navigate = useNavigate();
    const { group, loadingGroup, errorGroup, refetch } = useGetGroup();
    const repository = new GroupRepository();
    const { deleteGroup, isDeleting, error } = useDeleteGroup(repository);

const addBrigade = ()=>{
    navigate("/dashboard/grupo/registrar/administrador")
}

 const handleDelete = async (groupId: number, groupName: string) => {
        const result = await Swal.fire({
            title: `¿Eliminar grupo ${groupName}?`,
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            const success = await deleteGroup(groupId);
            
            if (success) {
                await Swal.fire(
                    '¡Eliminado!',
                    `El grupo ${groupName} ha sido eliminado.`,
                    'success'
                );
                refetch(); // Actualizar la lista
            } else {
                await Swal.fire(
                    'Error',
                    error || 'No se pudo eliminar el grupo',
                    'error'
                );
            }
        }
    };

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
      {/* Círculo decorativo superior con gradiente suave */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-violet-300 to-violet-400 h-6 w-6 rounded-full shadow-md z-20"></div>

      {/* Título con decoración sutil */}
      <div className="relative pb-3 mb-3 z-20">
        <p className="text-lg font-semibold text-gray-800 inline-block relative">
          {group.nameGroup}
          <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-violet-200 to-violet-300 rounded-full"></span>
        </p>
      </div>

      {/* Contenido con estilo minimalista */}
      <div className="space-y-3 group-hover/item:bg-white/30 transition-all duration-300">
        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50/50 transition-colors">
          <div className="p-1.5 bg-violet-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-gray-700 font-medium">{group.dateGroup}</span>
        </div>
      </div>

      {/* Botones (se mantienen igual) */}
      <div className="mt-5 flex flex-col sm:flex-row justify-between gap-3">
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 hover:from-amber-200 hover:to-amber-100 border border-amber-200 transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto rounded-xl cursor-pointer group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span className="group-hover:font-medium">Editar</span>
        </button>

        <button 
        onClick={() => {
          if (typeof group.idGroup === 'number') {
            handleDelete(group.idGroup, group.nameGroup);
          }
        }}
        disabled={isDeleting}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-50 to-rose-100 text-rose-700 hover:from-rose-100 hover:to-rose-50 border border-rose-200 transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto rounded-xl cursor-pointer group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span className="group-hover:font-medium">{isDeleting ? 'Eliminando...' : 'Eliminar'}</span>
        </button>
      </div>

      {/* Elemento decorativo abstracto suave */}
      <div className={style.cardDecoration} style={{ background: "radial-gradient(circle, rgba(196, 181, 253, 0.15) 0%, rgba(0, 0, 0, 0) 70%" }}></div>
    </div>
  ))}
</main>
        </>
     );
}

export default CardGroups;