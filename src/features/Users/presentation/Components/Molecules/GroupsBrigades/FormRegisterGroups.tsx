import { useState } from "react";
import style from "../../Molecules/RegistroBrigadasVacunacion/brigades.module.css";
import calender from "../../../../../../assets/calender.png";
import vacunas from "../../../../../../assets/groupIcon.png";
import add from "../../../../../../assets/add.png";
import { useModalBoxs } from "./ModalBoxVaccinesContext";
import { useGetBrigades } from "../../../../Brigades/Presentation/Hooks/useGetBrigades";
import { useGetBox } from "../../../../BoxVaccine/Presentation/Hooks/useGetBoxVaccine";
import { useCreateGroup } from "../../../../Group/Presentation/Hooks/useCreateGroup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
function FormRegisterGroups() {
    const { abrirModal } = useModalBoxs();
    const navegate = useNavigate();
    const [selectedBrigade, setSelectedBrigade] = useState<{id: number, nombre: string} | null>(null);
    const [selectedBox, setSelectedBox] = useState<{id: number, amount: number} | null>(null);
    const [formData, setFormData] = useState({
        nameGroup: '',
        dateGroup: ''
    });
    const { groupedBrigades, loading, error } = useGetBrigades();
    const {box, loadingBox, errorBox, refetch} = useGetBox();
    const { createGroup, loadingCreateGroup, errorCreateGroup, createdGroup, reset } = useCreateGroup();

    const handleSelectBrigade = (brigade: {id: number, nombre: string}) => {
        setSelectedBrigade(brigade);
    };

    const handleSelectBox = (box: {id: number, amount: number}) => {
        setSelectedBox(box);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBrigade || !selectedBox || !formData.nameGroup || !formData.dateGroup) {
        Swal.fire('Por favor completa todos los campos y selecciona una brigada y una caja de vacunas');
        return;
    }

    try {
        await createGroup({
            nameGroup: formData.nameGroup,
            dateGroup: formData.dateGroup,
            idVaccineBox: selectedBox.id,
            idBrigade: selectedBrigade.id
        });
        
        // Limpiar formulario después de éxito
        setFormData({
            nameGroup: '',
            dateGroup: ''
        });
        setSelectedBrigade(null);
        setSelectedBox(null);
        
        Swal.fire('Grupo creado exitosamente!');
        navegate('/dashboard/grupos/administrador');
    } catch (error) {
        console.error('Error al crear grupo:', error);
        Swal.fire('Error al crear el grupo. Por favor intenta nuevamente.');
    }
};

    return ( 
        <>
            <div className="mt-10 flex flex-col sm:flex-row sm:justify-between sm:items-center ml-10">
                <p className="text-2xl text-[#00000081]" id={style.title1}>
                    Registro del grupo
                </p>
            </div>

            <form onSubmit={handleSubmit} className="pb-6">
                {/* Nombre del grupo */}
                <div className="flex flex-col w-[44vh] sm:w-[156vh] ml-7 mt-7">
                    <label htmlFor="nombre" className="text-[2.4vh] mb-2 ml-5 font-medium">
                        Nombre del grupo
                    </label>
                    <input
                        id="nameGroup"
                        type="text"
                        className="border border-gray-300 rounded-md px-3 py-2 w-full mt-1 max-h-11
                                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                        placeholder="Ej. Covid-19"
                        value={formData.nameGroup}
                        onChange={handleInputChange}
                    /> 
                </div>

                {/* Fecha de aplicación */}
                <div>
                    <div className="flex flex-col sm:w-[90%] ml-7 mt-9">
                        <label className="text-[2.4vh] mb-4 font-medium ml-5">
                            Fecha de aplicación
                        </label>
                        <div className="flex flex-col sm:flex-row gap-6 pr-12 sm:pr-0">
                            <div className="flex flex-col flex-1">
                                <div className="flex ml-6 gap-2">
                                    <img src={calender} className="w-5 h-5" alt="" />
                                    <label htmlFor="fecha" className="text-sm text-gray-800 mb-1">
                                        Fecha
                                    </label>
                                </div>
                                <input
                                    id="dateGroup"
                                    type="date"
                                    value={formData.dateGroup}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full mt-1
                                            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Listado de brigadas */}
<main className="flex flex-col lg:flex-row gap-6 px-6">
  {/* Sección Brigadas */}
  <div className="w-full lg:w-1/2">
    <div className="flex flex-col w-full mt-9">
      <label className="text-[2.4vh] mb-4 font-medium ml-5">
        Información para brigada
      </label>

      {/* Brigada seleccionada */}
      {selectedBrigade && (
        <div className="ml-5 mb-4">
          <div className="flex items-center gap-8 bg-blue-50 p-3 rounded-md border border-blue-100 w-fit">
            <span className="font-medium text-blue-800">
              Brigada seleccionada: {selectedBrigade.nombre}
            </span>
            <span className="text-sm text-blue-600">
              (Haz click en otra brigada para cambiar)
            </span>
          </div>
        </div>
      )}

      <div className="flex ml-6 gap-2 mb-2">
        <img src={vacunas} className="w-5 h-5" alt="" />
        <label className="text-sm text-gray-800">
          Brigadas disponibles: {groupedBrigades.length}
        </label>
      </div>

      <div className="overflow-x-auto max-h-[30vh] rounded-3xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0 bg-gradient-to-r from-blue-50 to-gray-50 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b">
                <div className="flex items-center">
                  <span>Nombre</span>
                </div>
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider border-b">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {groupedBrigades.map((brigade, index) => (
              <tr
                key={brigade.idBrigade}
                className={`hover:bg-blue-50 transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {brigade.referenceBrigade}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex justify-center items-center gap-6">
                    <button
                      type="button"
                      onClick={() => handleSelectBrigade({
                        id: brigade.idBrigade,
                        nombre: brigade.referenceBrigade,
                      })}
                      className="p-1.5 sm:p-2 rounded-full bg-[#b5bbbb] hover:bg-[#0dbfbe] transition-all duration-200 flex items-center justify-center gap-1"
                    >
                      <span className="text-white font-bold text-sm block sm:hidden">
                        Agregar
                      </span>                      
                      <img
                        src={add}
                        className="w-5 h-5 filter brightness-0 invert hidden sm:block"
                        alt="Seleccionar brigada"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  {/* Sección Cajas */}
  <div className="w-full lg:w-1/2">
    <div className="flex flex-col w-full mt-9">
      <label className="text-[2.4vh] mb-4 font-medium ml-5">
        Información para cajas
      </label>

      {/* Caja seleccionada */}
      {selectedBox && (
        <div className="ml-5 mb-4">
          <div className="flex items-center gap-8 bg-blue-50 p-3 rounded-md border border-blue-100 w-fit">
            <span className="font-medium text-blue-800">
              Caja seleccionada con {selectedBox.amount} vacunas
            </span>
            <span className="text-sm text-blue-600">
              (Haz click en otra caja para cambiar)
            </span>
          </div>
        </div>
      )}

      <div className="flex ml-6 gap-2 mb-2">
        <img src={vacunas} className="w-5 h-5" alt="" />
        <label className="text-sm text-gray-800">
          Cajas disponibles: {box.length}
        </label>
      </div>

      <div className="overflow-x-auto max-h-[30vh] rounded-3xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0 bg-gradient-to-r from-blue-50 to-gray-50 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b">
                <div className="flex items-center">
                  <span>Nombre</span>
                </div>
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider border-b">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {box.map((cajas, index) => (
              <tr
                key={cajas.idVaccineBox}
                className={`hover:bg-blue-50 transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Caja con {cajas.amountVaccines} vacunas
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex justify-center items-center gap-6">
                    <button
                    type="button"
                      onClick={() =>
                        handleSelectBox({
                          id: cajas.idVaccineBox,
                          amount: cajas.amountVaccines ?? 0,
                        })
                      }
                      className="p-1.5 rounded-full bg-[#b5bbbb] hover:bg-[#0dbfbe] transition-all duration-200"
                    >
                      <span className="text-white font-bold text-sm block sm:hidden">
                        Agregar
                      </span>    
                      <img
                        src={add}
                        className="w-5 h-5 filter brightness-0 invert hidden sm:block"
                        alt="Seleccionar caja"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</main>

                <div className="flex justify-center pr-0 mt-7 sm:pr-24 sm:flex sm:justify-end">
                    <button 
                    type="submit"
                    disabled={loadingCreateGroup}
                    className="bg-[#1677FF] text-white py-3 px-1 sm:px-7 rounded min-w-10 hover:bg-[#1677ffcc] transition cursor-pointer">
                        {loadingCreateGroup ? 'Creando...' : 'Registrar grupo'}
                    </button>
                </div>
            </form>
        </>
    );
}

export default FormRegisterGroups;