import style from "../../Molecules/BoxVaccines/box.module.css"
import vaccine from "../../../../../../assets/vacunas.png"
import Swal from "sweetalert2"
import { useState } from "react"
import { useModalBrigadesVaccine } from "../RegistroBrigadasVacunacion/ModalBrigadesVaccineContext"
import { useModalVaccinesPrincipal } from "../GestionVacunas/ModalVaccinesPrincipalContext"
import { useGetBox } from "../../../../BoxVaccine/Presentation/Hooks/useGetBoxVaccine"
import { BoxRepository } from "../../../../BoxVaccine/Domain/BoxVaccineRepository"
import { useDeleteUser } from "../../../../User/Presentation/Hooks/useDeleteUser"
import { useDeleteBox } from "../../../../BoxVaccine/Presentation/Hooks/useDeleteBox"
function CardsBoxVaccines() {
  const {abrirModalVaccine} = useModalBrigadesVaccine()
  const {abrirModal} = useModalVaccinesPrincipal()
  const {box, loadingBox, errorBox, refetch} = useGetBox();
  const { deleteBox, loading, error, success } = useDeleteBox(new BoxRepository());
  const [token] = useState(localStorage.getItem('token') || '');

  const handleDelete = async (idBox: number) => {
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'No hay token de autenticación',
      });
      return;
    }

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
        const deleted = await deleteBox(idBox, token);
        
        if (deleted) {
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
      {/* Bolita superior decorativa */}

      {/* Título */}

      {/* Datos con íconos */}
      <div className="space-y-2 text-sm text-gray-800 mt-3">
        <div className="flex items-center gap-2">
          <img src={vaccine} alt="location" className="w-4 h-4" />
          <div className="flex gap-2">
          <p>Cantidad de vacunas: </p>
            <p className="font-bold">{boxs.amountVaccines}</p>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="mt-5 flex flex-col sm:flex-row justify-between gap-3">
  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#c3d0b363] text-[#00000089] rounded-md text-sm hover:bg-yellow-200 transition w-full sm:w-auto">
    <i className="fas fa-edit"></i> Editar
  </button>
  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#d7757555] text-[#00000089] rounded-md text-sm hover:bg-rose-300 transition w-full sm:w-auto cursor-pointer"
  onClick={() => handleDelete(boxs.idVaccineBox)}>
    <i className="fas fa-trash-alt"></i> Eliminar
  </button>
</div>

    </div>
  ))}
</main>
        </>
     );
}

export default CardsBoxVaccines;