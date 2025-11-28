import style from "../../Molecules/BoxVaccines/box.module.css"
import vaccine from "../../../../../../assets/vacunas.png"
import Swal from "sweetalert2"
import { useState } from "react"
import { useModalBrigadesVaccine } from "../RegistroBrigadasVacunacion/ModalBrigadesVaccineContext"
import { useModalVaccinesPrincipal } from "../GestionVacunas/ModalVaccinesPrincipalContext"
import { useGetBox } from "../../../../BoxVaccine/Presentation/Hooks/useGetBoxVaccine"
import { BoxRepository } from "../../../../BoxVaccine/Domain/BoxVaccineRepository"
import { useDeleteBox } from "../../../../BoxVaccine/Presentation/Hooks/useDeleteBox"
import ModalEditVaccines from "./ModalEditVaccines" // Importa el nuevo modal

function CardsBoxVaccines() {
  const {abrirModalVaccine} = useModalBrigadesVaccine()
  const {abrirModal} = useModalVaccinesPrincipal()
  const {box, loadingBox, errorBox, refetch} = useGetBox();
  const { deleteBox, loading, error, success } = useDeleteBox(new BoxRepository());
  const [token] = useState(localStorage.getItem('token') || '');
  
  // Estado para el modal de edición
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState<{id: number, amount: number} | null>(null);

  const handleDelete = async (idBox: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const success = await deleteBox(idBox);
        
        if (success) {
          await Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'La caja ha sido eliminada correctamente',
            timer: 2000,
            showConfirmButton: false,
          });
          refetch();
        } else {
          throw new Error('No se pudo eliminar la caja');
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al eliminar la caja',
        });
      }
    }
  };

  // Función para abrir el modal de edición
  const handleEdit = (idBox: number, currentAmount: number) => {
    setSelectedBox({ id: idBox, amount: currentAmount });
    setIsEditModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedBox(null);
  };

  return ( 
    <>
      <div className="mt-10 mx-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pl-7 pr-7">
        <p className="text-2xl text-[#00000081]" id={style.title1}>
          Cajas de vacunas
        </p>

        <div className="gap-5 flex">
          <button
            onClick={abrirModal}
            className="bg-[#74b76d] text-white py-3 px-5 sm:px-7 rounded hover:bg-[#1677ff99] transition cursor-pointer w-full sm:w-auto">
            Agregar vacuna
          </button>

          <button
            onClick={abrirModalVaccine}
            className="bg-[#5ebcff] text-white py-3 px-5 sm:px-7 rounded hover:bg-[#1677ff99] transition cursor-pointer w-full sm:w-auto">
            Agregar caja
          </button>
        </div>
      </div>

      <main id={style.containerGrid} className="mt-1">
        {box.map((boxs, index) => (
          <div key={index} id={style.card}>
            {/* Banda superior tipo caja médica */}
            <div id={style.medicalStrip}></div>
            
            {/* Icono médico decorativo */}
            <div id={style.medicalIcon}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7V12M12 12V17M12 12H7M12 12H17M5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20Z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>

            {/* Contenido principal */}
            <div className="space-y-2 text-sm text-gray-800 mt-3 relative z-10">
              <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-lg">
                <img src={vaccine} alt="vacunas" className="w-5 h-5" />
                <div className="flex gap-2">
                  <p>Cantidad de vacunas: </p>
                  <p className="font-bold text-blue-600">{boxs.amountVaccines}</p>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="mt-5 flex flex-col sm:flex-row justify-between gap-3">
              <button 
                onClick={() => handleEdit(boxs.idVaccineBox, boxs.amountVaccines)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 hover:from-amber-200 hover:to-amber-100 border border-amber-200 transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto rounded-xl cursor-pointer group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="group-hover:font-medium">Editar</span>
              </button>

              <button 
                onClick={() => handleDelete(boxs.idVaccineBox)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-50 to-rose-100 text-rose-700 hover:from-rose-100 hover:to-rose-50 border border-rose-200 transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto rounded-xl cursor-pointer group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="group-hover:font-medium">Eliminar</span>
              </button>
            </div>
            
            {/* Patrón de fondo médico sutil */}
            <div id={style.medicalPattern}></div>
          </div>
        ))}
      </main>

      {/* Modal de edición */}
      {selectedBox && (
        <ModalEditVaccines
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          boxId={selectedBox.id}
          currentAmount={selectedBox.amount}
          onUpdate={refetch}
        />
      )}
    </>
  );
}

export default CardsBoxVaccines;