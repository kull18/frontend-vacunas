import x from "../../../../../../assets/x.png"
import edit from "../../../../../../assets/edit.png"
import deleted from "../../../../../../assets/delete.png"
import time from "../../../../../../assets/reloj.png";
import ubication from "../../../../../../assets/ubication.png";
import location from "../../../../../../assets/location.png";
import { useModalBrigades } from "./ModalBrigadesContext";
import { useState } from "react";
import Swal from "sweetalert2";
import { useCreateBrigades } from "../../../../Brigades/Presentation/Hooks/useCreateBrigades";
import { BrigadesRepository } from "../../../../Brigades/Domain/BrigadesRepository";
import { CreateBrigadeUseCase } from "../../../../Brigades/Application/CreateBrigadesUseCase";
function ModalBrigades() {
    const {cerrarModal} = useModalBrigades();
    const [locations, setLocations] = useState("");
  const [locationData, setLocationData] = useState<
    { id: number; especificPlace: string }[]
  >([]);

    const [referenceBrigade, setReferenceBrigade] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");


  const brigadesRepository = new BrigadesRepository();
  const createBrigadeUseCase = new CreateBrigadeUseCase(brigadesRepository);

  const { createBrigade, loading, error, success, reset } = useCreateBrigades(createBrigadeUseCase);

   const addLocations = () => {
    for(const loc of locationData) {
      if (loc.especificPlace.trim() === locations.trim()) {
        Swal.fire("Esta localización ya ha sido agregada");
        return;
      }
    }

    if (locations.trim() === "") {
      Swal.fire("Debes ingresar una localización");
      return;
    }

    const newLocation = {
      id: Date.now(), // ID único temporal
      especificPlace: locations.trim(),
    };

    setLocationData([...locationData, newLocation]);
    setLocations("");
  };

  const deleteLocation = (id: number) => {
    setLocationData(locationData.filter((loc) => loc.id !== id));
  };

  const addBrigade = async () => {
        // Validate required fields
        if (!referenceBrigade.trim()) {
            Swal.fire("Error", "La referencia de la brigada es requerida", "error");
            return;
        }

        if (locationData.length === 0) {
            Swal.fire("Error", "Debe agregar al menos una localización", "error");
            return;
        }

        // Format dates according to API requirements
        const formattedStartDate = `${startDate}T${startTime || "00:00:00"}`;
        const formattedEndDate = `${endDate}T${endTime || "23:59:59"}`;

        const requestPayload = {
        referenceBrigade: referenceBrigade.trim(),
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        locations: locationData.map(loc => loc.especificPlace)
    };
        console.log("📤 PAYLOAD QUE SE ENVIARÁ:", JSON.stringify(requestPayload, null, 2));
        try {
            await createBrigade({
                referenceBrigade: referenceBrigade.trim(),
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                locations: locationData.map(loc => loc.especificPlace)
            });

            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Brigada creada correctamente',
                timer: 2000
            });
            cerrarModal();
            window.location.reload();
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error || 'Error al crear la brigada'
            });
        }
    };

    return ( 
        <>
          <div className="fixed inset-0 bg-[#0000002b] backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white w-[50vh] sm:w-[105vh] rounded-lg shadow-xl p-6 pl-3 border-2 border-[#c0c0c0] max-h-[91vh] overflow-y-auto md:overflow-y-visible">

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
          value={referenceBrigade}
          onChange={(e) => setReferenceBrigade(e.target.value)}
          id="referenceBrigade"
          type="text"
          className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
          placeholder="Ej. Tuxtla Gutierrez"
        />
      </div>

    {/* FECHA DE INICIO Y FIN */}

<div className="flex flex-col gap-4 w-full py-2">
  {/* Contenedor principal - se convierte en fila en desktop */}
  <div className="flex flex-col sm:flex-row w-full gap-4 mt-3">
    
    {/* Grupo Horario Inicio */}
    <div className="flex-1 flex flex-col">
      <div className="flex items-center gap-2 mb-1 ml-2 sm:ml-4">
        <img src={time} className="w-5 h-5" alt="Icono de hora" />
        <label htmlFor="fechaInicio" className="text-sm text-gray-800 whitespace-nowrap">
          Horario de inicio
        </label>
      </div>

      <div className="flex gap-2">
        <input
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          id="fechaInicio"
          type="date"
          className="border border-gray-300 rounded-md px-3 py-2 flex-1 min-w-0 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
        />
        <input
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          id="horaInicio"
          type="time"
          className="border border-gray-300 rounded-md px-3 py-2 flex-1 min-w-0 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
        />
      </div>
    </div>

    {/* Grupo Horario Fin */}
    <div className="flex-1 flex flex-col">
      <div className="flex items-center gap-2 mb-1 ml-2 sm:ml-4">
        <img src={time} className="w-5 h-5" alt="Icono de hora" />
        <label htmlFor="fechaFin" className="text-sm text-gray-800 whitespace-nowrap">
          Horario de fin
        </label>
      </div>

      <div className="flex gap-2">
        <input
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
          id="fechaFin"
          type="date"
          className="border border-gray-300 rounded-md px-3 py-2 flex-1 min-w-0 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
        />
        <input
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
          id="horaFin"
          type="time"
          className="border border-gray-300 rounded-md px-3 py-2 flex-1 min-w-0 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
        />
      </div>
    </div>

  </div>
</div>

            <div className="flex items-center gap-2 mb-1 ml-4 mt-3">
              <img src={location} className="w-5 h-5 opacity-25" alt="Icono de hora" />
              <label htmlFor="fechaFin" className="text-sm text-gray-800">
                Localizaciones
              </label>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
                <input
                id="fechaFin"
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                placeholder="Localicaziones exactas del lugar"
                value={locations}
                onChange={(e) => setLocations(e.target.value)}
              />
              <div className="ml-4 sm:ml-0">
              <button 
                onClick={addLocations}
                className="bg-[#16aaff] min-w-auto hover:bg-[#16aaffd2] text-white py-4 px-4 font-medium rounded transition cursor-pointer text-sm whitespace-nowrap"
                >Agregar localizacion
                </button>
                </div>
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
                    {locationData.map((historial) => (
                    <tr key={historial.id} className="border-b border-gray-300">
                        <td className="px-6 py-3">{historial.especificPlace}</td>
                        <td className="px-6 py-3">
                        <div className="flex justify-center items-center gap-6">
                            <img
                            src={deleted}
                            className="w-6 opacity-50 hover:opacity-75 cursor-pointer transition"
                            alt="Eliminar"
                            onClick={() => deleteLocation(historial.id)}
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
    <button 
      onClick={addBrigade}
    className="bg-[#1677FF] font-medium text-white py-[1.9vh] px-4 rounded w-full hover:bg-[#1677ffcc] transition cursor-pointer">
      Agregar
    </button>
  </div>
    </div>
</div>
        </>
    );
}

export default ModalBrigades;