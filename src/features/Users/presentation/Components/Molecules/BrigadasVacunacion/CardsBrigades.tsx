import style from "../../Molecules/RegistroBrigadasVacunacion/brigades.module.css"
import ubicacion from "../../../../../../assets/ubication.png"
import location from "../../../../../../assets/location.png"
import { useNavigate } from "react-router-dom"
import { useModalBrigades } from "../RegistroBrigadasVacunacion/ModalBrigadesContext"
import { useGetBrigades } from "../../../../Brigades/Presentation/Hooks/useGetBrigades"
import { useDeleteBrigade } from "../../../../Brigades/Presentation/Hooks/useDeleteBrigades"
import { BrigadesRepository } from "../../../../Brigades/Domain/BrigadesRepository"
import Swal from "sweetalert2"

function CardsBrigades() {
  const {abrirModal} = useModalBrigades()
  const { groupedBrigades } = useGetBrigades();
  const brigadesRepository = new BrigadesRepository();
  const { deleteBrigade, loading: deleting } = useDeleteBrigade(brigadesRepository);
  const navigate = useNavigate();

  const getBrigadeById = (idBrigade: number) =>{
    navigate(`/dashboard/brigada-individual/administrador/${idBrigade}`);
  }

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteBrigade(id);
        await Swal.fire("¡Eliminado!", "La brigada ha sido eliminada.", "success");
        window.location.reload();
      } catch (err) {
        Swal.fire("Error", "No se pudo eliminar la brigada.", "error");
      }
    }
  };

  return ( 
    <>
      <div className="mt-10 mx-5 flex flex-col ml-10 sm:flex-row sm:justify-between sm:items-center gap-3">
        <p className="text-2xl text-[#00000081] font-semibold" id={style.title1}>
          Brigadas de vacunación
        </p>

        <button
          onClick={abrirModal}
          className="bg-[#089ea1] text-white py-3 px-6 rounded-lg hover:bg-[#0dbfbe] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 w-full sm:w-auto font-medium"
        >
          Agregar brigada
        </button>
      </div>

      <main id={style.containerGrid} className="mt-8 mx-5 ml-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groupedBrigades.map(brigada => (
          <div 
            key={brigada.idBrigade} 
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 relative border border-gray-100 hover:border-teal-200"
          >
            {/* Círculo decorativo superior */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-teal-400 to-teal-600 h-7 w-7 rounded-full shadow-lg"></div>

            {/* Título */}
            <div className="text-center mb-5 pt-2">
              <h3 className="text-xl font-bold text-gray-800">
                {brigada.referenceBrigade}
              </h3>
              <div className="mt-2 mx-auto w-16 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"></div>
            </div>

            {/* Información */}
            <div className="space-y-4 mb-6">
              {/* Fechas */}
              <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <img src={ubicacion} alt="calendar" className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="text-gray-600 mb-1">
                      <span className="font-semibold text-gray-700">Inicio:</span> {new Date(brigada.startDate).toLocaleString('es-MX')}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-700">Fin:</span> {new Date(brigada.endDate).toLocaleString('es-MX')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Localizaciones */}
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <img src={location} alt="location" className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Localizaciones:</span>
                      <span className="ml-2 inline-flex items-center justify-center bg-teal-500 text-white rounded-full w-7 h-7 text-sm font-bold">
                        {brigada.locationsCount}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {/* Botón Editar */}
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-200 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl cursor-pointer group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span className="text-sm font-medium">Editar</span>
                </button>

                {/* Botón Eliminar */}
                <button 
                  onClick={() => handleDelete(brigada.idBrigade)}
                  disabled={deleting}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-100 text-rose-700 hover:bg-rose-200 border border-rose-200 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="text-sm font-medium">{deleting ? "Eliminando..." : "Eliminar"}</span>
                </button>
              </div>

              {/* Botón Ver Localizaciones */}
              <button 
                onClick={() => getBrigadeById(brigada.idBrigade)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl cursor-pointer group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">Ver localizaciones</span>
              </button>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}

export default CardsBrigades;