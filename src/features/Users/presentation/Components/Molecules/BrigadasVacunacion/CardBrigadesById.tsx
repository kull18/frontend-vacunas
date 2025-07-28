import { useParams } from "react-router-dom";
import { useGetBrigadeById } from "../../../../Brigades/Presentation/Hooks/useGetBrigadesById";
import style from "../BrigadasVacunacion/cardsBrigades.module.css";
import x from "../../../../../../assets/x.png";
import Swal from "sweetalert2";
import { BrigadesRepository } from "../../../../Brigades/Domain/BrigadesRepository"
import { useDeleteLocationById } from "../../../../Brigades/Presentation/Hooks/useDeleteLocationById";
function CardsBrigadesById() {
  const { idBrigade } = useParams<{ idBrigade: string }>();
  const brigadeId = idBrigade ? parseInt(idBrigade) : null;
  
  const brigadesRepository = new BrigadesRepository();
  const { brigade, loading, error, refreshBrigade } = useGetBrigadeById(brigadeId);
  const { deleteLocation, loadingLocation: deleting, success, errorLocation: deleteError } = useDeleteLocationById(brigadesRepository);

  if (loading) return <div className="p-5">Cargando brigada...</div>;
  if (error) return <div className="p-5 text-red-500">Error: {error}</div>;
  if (!brigade) return <div className="p-5">No se encontró la brigada</div>;

  const returnPage = () => {
    window.history.back();
  };

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
        await deleteLocation(id);
        await Swal.fire("¡Eliminado!", "La brigada ha sido eliminada.", "success");
        window.location.reload();
      } catch (err) {
        Swal.fire("Error", "No se pudo eliminar la brigada.", "error");
      }
    }
  };

  return (
  <div className="p-5 max-w-6xl mx-auto mt-7">
  {/* Encabezado con espacio between */}
  <div id={style.headerContainer}>
    <h2 id={style.brigadeTitle}>
      {brigade.referenceBrigade}
    </h2>
    <button
      onClick={returnPage}
      id={style.backButton}
      className="font-medium hover:shadow-md cursor-pointer"
    >
      ← Regresar
    </button>
  </div>
  
  {/* Resto del contenido permanece igual */}
  <div className="bg-white rounded-lg shadow-md p-6 mb-8">
    <div className="space-y-4">
      <p id={style.dateText} className="flex items-center">
        <span className="font-semibold mr-2">📅 Fecha Inicio:</span>
        {new Date(brigade.startDate).toLocaleString('es-MX')}
      </p>
      <p id={style.dateText} className="flex items-center">
        <span className="font-semibold mr-2">📅 Fecha Fin:</span>
        {new Date(brigade.endDate).toLocaleString('es-MX')}
      </p>
    </div>
  </div>

<div className="mb-8">
  <h3 className="text-xl font-bold text-gray-800 mb-4">📍 Localizaciones</h3>
  <div id={style.locationsContainer}>
    {brigade.locations.map((loc, index) => (
      <div 
        key={`${loc.idLocation}-${index}`} 
        id={style.locationCard}
        className="group flex justify-between" // Para efectos hover
      >
        <p id={style.locationText}>
          <span className="mr-2 text-[#089ea1]">📍</span>
          <span className="group-hover:text-[#089ea1] transition-colors">
            {loc.location}
          </span>
        </p>
        <div
        onClick={() => handleDelete(loc.idLocation)} 
        className="hover:bg-[#0000001d] p-2 rounded-full duration-200 cursor-pointer" title="Eliminar localización">
          <img src={x} alt="" className="w-3 h-4 opacity-60" />
        </div>
      </div>
    ))}
  </div>
</div>

  <button 
    id={style.refreshButton}
    onClick={refreshBrigade}
    className="px-6 py-3 rounded-lg font-medium shadow cursor-pointer"
  >
    🔄 Refrescar datos
  </button>
</div>
  );
}

export default CardsBrigadesById;