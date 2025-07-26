import x from "../../../../../../assets/x.png"
import edit from "../../../../../../assets/edit.png"
import deleted from "../../../../../../assets/delete.png"
import time from "../../../../../../assets/reloj.png";
import ubication from "../../../../../../assets/ubication.png";
import location from "../../../../../../assets/location.png";
import { useModalBrigades } from "./ModalBrigadesContext";
function ModalBrigades() {
    const {cerrarModal} = useModalBrigades();
const lugar = [
  {
    id: 1,
    place: "Brigada Norte",
    especificPlace: "ESquina"
  },
  {
    id:2,
    place: "Brigada Rural Oriente",
    especificPlace: "casa de regiber"
  },
  {
    id:3,
    place: "Brigada Escolar Sur",
    especificPlace: "parque"
  },
  {
    id:4,
    place: "Brigada Urbana Centro",
    especificPlace: "suchiapa"
  },
  {
    id:5,
    place: "Brigada Móvil Regional",
    especificPlace: "catedral de tuxtla"
  }
];

    return ( 
        <>
            <div className="fixed inset-0 bg-[#0000002b] backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white w-[50vh] sm:w-[80vh] rounded-lg shadow-xl p-6 pl-3 border-2 border-[#c0c0c0]">

        <div className="flex justify-between items-center mb-4 pr-4 pt-3">
        <p className="text-2xl font-semibold text-[#1f3445] ml-5">Gestión de brigada</p>
        <img
            src={x} 
            alt="Cerrar"
            className="w-4 cursor-pointer opacity-70 hover:opacity-40 transition-opacity"
            onClick={cerrarModal}
        />
        </div>

      <div className="pr-7">
        <div className="flex items-center gap-2 mb-1 ml-5">
            <img src={ubication} className="w-5 h-5" alt="Icono de hora" />
            <label htmlFor="fechaInicio" className="text-sm text-gray-800">
              Referencia de ubicación
            </label>
        </div>

        <input
          id="fechaInicio"
          type="text"
          className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
          placeholder="Ej. Tuxtla Gutierrez"
        />
      </div>

  <div className="flex flex-col gap-4 w-full py-2">
    
  <div className="flex flex-row w-full gap-6 mt-3">
  <div className="flex flex-col w-[30vh]">
    <div className="flex items-center gap-2 mb-1 ml-5">
      <img src={time} className="w-5 h-5" alt="Icono de hora" />
      <label htmlFor="fechaInicio" className="text-sm text-gray-800">
        Horario de inicio
      </label>
    </div>
    
      <input
        id="fechaInicio"
        type="time"
        className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
        placeholder="Hora de inicio"
      />
  </div>

  <div className="flex flex-col w-[30vh]">
    <div className="flex items-center gap-2 mb-1 ml-5">
      <img src={time} className="w-5 h-5" alt="Icono de hora" />
      <label htmlFor="fechaFin" className="text-sm text-gray-800">
        Horario de fin
      </label>
    </div>
    <input
      id="fechaFin"
      type="time"
      className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
      placeholder="Hora de fin"
    />
  </div>
</div>

</div>

            <div className="flex items-center gap-2 mb-1 ml-4 mt-2">
              <img src={location} className="w-5 h-5 opacity-25" alt="Icono de hora" />
              <label htmlFor="fechaFin" className="text-sm text-gray-800">
                Localizaciones
              </label>
            </div>

            <div className="flex gap-3">
                <input
                id="fechaFin"
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                placeholder="Localicaziones exactas del lugar"
              />
              <button 
                className="bg-[#16aaff] min-w-auto hover:bg-[#16aaffd2] text-white py-4 px-4 font-medium rounded transition cursor-pointer text-sm whitespace-nowrap"
                >Agregar localizacion
                </button>
            </div>

        <div className="overflow-x-auto w-full mt-2 max-h-[30vh] pl-4">
            <table className="w-full border border-gray-300 mt-3">
                <thead className="bg-[#F4F4F4] sticky top-0 z-10">
                    <tr className="border-b border-gray-300">
                    <th className="px-6 py-3 text-left">Localizaciones</th>
                    <th className="px-6 py-3 text-center">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {lugar.map((historial) => (
                    <tr key={historial.id} className="border-b border-gray-300">
                        <td className="px-6 py-3">{historial.especificPlace}</td>
                        <td className="px-6 py-3">
                        <div className="flex justify-center items-center gap-6">
                            <img
                            src={edit}
                            className="w-6 opacity-50 hover:opacity-75 cursor-pointer transition"
                            alt="Editar"
                            />
                            <img
                            src={deleted}
                            className="w-6 opacity-50 hover:opacity-75 cursor-pointer transition"
                            alt="Eliminar"
                            />
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

        </div>
          {/* Botón debajo de los inputs */}
  <div className="w-full sm:w-full mt-6">
    <button className="bg-[#1677FF] font-medium text-white py-[1.9vh] px-4 rounded w-full hover:bg-[#1677ffcc] transition cursor-pointer">
      Agregar
    </button>
  </div>
    </div>
</div>
        </>
    );
}

export default ModalBrigades;