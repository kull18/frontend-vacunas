import style from "../../Molecules/BoxVaccines/box.module.css"
import vaccine from "../../../../../../assets/vacunas.png"
import { useModalBrigadesVaccine } from "../RegistroBrigadasVacunacion/ModalBrigadesVaccineContext"
function CardsBoxVaccines() {
  const {abrirModalVaccine} = useModalBrigadesVaccine()
  
    const box = [
  {
    nameBox: "Brigada Norte",
    quantitiesVaccines: 120
  },
  {
    nameBox: "Brigada Rural Oriente",
    quantitiesVaccines: 95
  },
  {
    nameBox: "Brigada Escolar Sur",
    quantitiesVaccines: 150
  },
  {
    nameBox: "Brigada Urbana Centro",
    quantitiesVaccines: 180
  },
  {
    nameBox: "Brigada Móvil Regional",
    quantitiesVaccines: 75
  }
];

    return ( 
        <>
         <div className="mt-10 mx-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pl-7 pr-7">
                <p className="text-2xl text-[#00000081]" id={style.title1}>
                    Cajas de vacunas
                </p>

            <button
                onClick={abrirModalVaccine}
                className="bg-[#5ebcff] text-white py-3 px-5 sm:px-7 rounded hover:bg-[#1677ff99] transition cursor-pointer w-full sm:w-auto"
            >
                Agregar caja
            </button>
        </div>

        <main id={style.containerGrid} className="mt-1">
  {box.map((boxs, index) => (
    <div key={index} id={style.card}>
      {/* Bolita superior decorativa */}

      {/* Título */}
      <p className="text-lg font-semibold text-gray-800 mb-3 mt-3">{boxs.nameBox}</p>

      {/* Datos con íconos */}
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <img src={vaccine} alt="location" className="w-4 h-4" />
          <span>{boxs.quantitiesVaccines}</span>
        </div>
      </div>

      {/* Botones */}
      <div className="mt-5 flex flex-col sm:flex-row justify-between gap-3">
  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#c3d0b363] text-[#00000089] rounded-md text-sm hover:bg-yellow-200 transition w-full sm:w-auto">
    <i className="fas fa-edit"></i> Editar
  </button>
  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#d7757555] text-[#00000089] rounded-md text-sm hover:bg-rose-300 transition w-full sm:w-auto">
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