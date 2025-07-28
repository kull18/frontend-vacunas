import style from "../../Molecules/RegistroBrigadasVacunacion/brigades.module.css"
import calender from "../../../../../../assets/calender.png"
import time from "../../../../../../assets/reloj.png"
import enfermeros from "../../../../../../assets/enfermeros.png"
import vacunas from "../../../../../../assets/vacunas.png"
import ubicacion from "../../../../../../assets/ubication.png"
import location from "../../../../../../assets/location.png"
import { useNavigate } from "react-router-dom"
import { useModalBrigades } from "../RegistroBrigadasVacunacion/ModalBrigadesContext"
import { useGetBrigades } from "../../../../Brigades/Presentation/Hooks/useGetBrigades"
import { useState, useEffect, useCallback } from "react"
import type { Brigade } from "../../../../Brigades/Domain/Brigades"
import { useDeleteBrigade } from "../../../../Brigades/Presentation/Hooks/useDeleteBrigades"
import { BrigadesRepository } from "../../../../Brigades/Domain/BrigadesRepository"
import Swal from "sweetalert2"
function CardsBrigades() {
  const {abrirModal} = useModalBrigades()
  const { groupedBrigades, loading, error } = useGetBrigades();
  const brigadesRepository = new BrigadesRepository();
  const { deleteBrigade, loading: deleting, success, error: deleteError } = useDeleteBrigade(brigadesRepository);
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


<main id={style.containerGrid} className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
  {groupedBrigades.map(brigada => (
    <div key={brigada.idBrigade} id={style.card} className="h-full flex flex-col">
      {/* Círculo decorativo superior */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-teal-400 to-[#53999e] h-6 w-6 rounded-full shadow-lg z-20"></div>

      {/* Título con subrayado */}
      <div className="relative pb-2 mb-3">
        <p className="text-lg font-semibold text-gray-800 relative inline-block">
          {brigada.referenceBrigade}
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-teal-300 to-transparent"></span>
        </p>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow space-y-3 text-sm text-gray-700">
        <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="p-1 bg-teal-100 rounded-full">
            <img src={ubicacion} alt="location" className="w-4 h-4 opacity-80" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Inicio: {new Date(brigada.startDate).toLocaleString('es-MX')}</span>
            <span className="font-medium">Fin: {new Date(brigada.endDate).toLocaleString('es-MX')}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="p-1 bg-amber-100 rounded-full">
            <img src={location} alt="locations" className="w-4 h-4 opacity-70" />
          </div>
          <span className="font-medium">Localizaciones: <span className="text-teal-600">{brigada.locationsCount}</span></span>
        </div>
      </div>

      {/* Botones - Versión mejorada */}
      <div className="mt-5 space-y-3">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 hover:from-amber-200 hover:to-amber-100 border border-amber-200 transition-all duration-300 shadow-sm hover:shadow-md w-full rounded-xl cursor-pointer group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="group-hover:font-medium">Editar</span>
          </button>

          <button 
          onClick={() => handleDelete(brigada.idBrigade)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-50 to-rose-100 text-rose-700 hover:from-rose-100 hover:to-rose-50 border border-rose-200 transition-all duration-300 shadow-sm hover:shadow-md w-full rounded-xl cursor-pointer group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="group-hover:font-medium">{deleting ? "Eliminando..." : "Eliminar"}</span>
          </button>
        </div>

        {/* Botón Ver Localizaciones */}
        <button 
          onClick={() => getBrigadeById(brigada.idBrigade)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 hover:from-blue-100 hover:to-blue-50 border border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl cursor-pointer group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="group-hover:font-medium">Ver localizaciones</span>
        </button>
      </div>

      {/* Elemento decorativo */}
      <div className={style.cardDecoration}></div>
    </div>
  ))}
</main>

        </>
    );
}
export default CardsBrigades;