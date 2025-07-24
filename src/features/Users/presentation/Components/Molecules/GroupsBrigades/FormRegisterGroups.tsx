import { useState } from "react";
import style from "../../Molecules/RegistroBrigadasVacunacion/brigades.module.css";
import calender from "../../../../../../assets/calender.png";
import vacunas from "../../../../../../assets/groupIcon.png";
import add from "../../../../../../assets/add.png";
import { useModalBoxs } from "./ModalBoxVaccinesContext";

function FormRegisterGroups() {
    const { abrirModal } = useModalBoxs();
    const [selectedBrigade, setSelectedBrigade] = useState<{id: number, nombre: string} | null>(null);

    // Datos de ejemplo - reemplaza con tus datos reales
    const brigades = [
        { id: 1, nombre: "Brigada Covid-19" },
        { id: 2, nombre: "Brigada Influenza" },
        { id: 3, nombre: "Brigada Pediatría" },
        { id: 4, nombre: "Brigada Adultos Mayores" },
        { id: 5, nombre: "Brigada Escolar" },
        { id: 6, nombre: "Brigada Empresarial" },
    ];

    const handleSelectBrigade = (brigade: {id: number, nombre: string}) => {
        setSelectedBrigade(brigade);
    };

    return ( 
        <>
            <div className="mt-10 flex flex-col sm:flex-row sm:justify-between sm:items-center ml-10">
                <p className="text-2xl text-[#00000081]" id={style.title1}>
                    Registro del grupo
                </p>
            </div>

            <main className="pb-6">
                {/* Nombre del grupo */}
                <div className="flex flex-col w-[44vh] sm:w-[156vh] ml-7 mt-7">
                    <label htmlFor="nombre" className="text-[2.4vh] mb-2 ml-5 font-medium">
                        Nombre del grupo
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        className="border border-gray-300 rounded-md px-3 py-2 w-full mt-1 max-h-11
                                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                        placeholder="Ej. Covid-19"
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
                                    id="fecha"
                                    type="date"
                                    className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full mt-1
                                            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Listado de brigadas */}
                <div>
                    <div className="flex flex-col sm:w-[90%] ml-7 mt-9">
                        <label className="text-[2.4vh] mb-4 font-medium ml-5">
                            Información para brigada
                        </label>

                                       {/* Brigada seleccionada */}
                {selectedBrigade && (
                    <div className="ml-3 sm:ml-4 mb-4 pr-7 sm:pr-0">
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
                        <div className="flex flex-col sm:flex-row gap-6 pr-12 sm:pr-0">
                            <div className="flex flex-col flex-1">
                                <div className="flex ml-6 gap-2">
                                    <img src={vacunas} className="w-5 h-5" alt="" />
                                    <label htmlFor="fecha" className="text-sm text-gray-800 mb-1">
                                        Brigadas disponibles: {brigades.length}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabla de brigadas */}
                <div className="overflow-x-auto w-full max-h-[30vh] pl-10 pr-10 mt-4 mb-5">
                    <table className="w-full border border-gray-300">
                        <thead className="bg-[#F4F4F4] sticky top-0 z-10">
                            <tr className="border-b border-gray-300">
                                <th className="px-6 py-3 text-left">Nombre</th>
                                <th className="px-6 py-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brigades.map((brigade) => (
                                <tr 
                                    key={brigade.id} 
                                    className={`border-b border-gray-300 ${
                                        selectedBrigade?.id === brigade.id ? "bg-blue-50" : ""
                                    }`}
                                >
                                    <td className="px-6 py-3">{brigade.nombre}</td>
                                    <td className="px-6 py-3">
                                        <div className="flex justify-center items-center gap-6">
                                            <img
                                                src={add}
                                                className={`w-6 hover:opacity-75 cursor-pointer transition ${
                                                    selectedBrigade?.id === brigade.id 
                                                        ? "opacity-100" 
                                                        : "opacity-50"
                                                }`}
                                                alt="Seleccionar brigada"
                                                onClick={() => handleSelectBrigade(brigade)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center pr-0 mt-7 sm:pr-24 sm:flex sm:justify-end">
                    <button className="bg-[#1677FF] text-white py-3 px-1 sm:px-7 rounded min-w-10 hover:bg-[#1677ffcc] transition cursor-pointer">
                        Registrar caja de vacuna
                    </button>
                </div>
            </main>
        </>
    );
}

export default FormRegisterGroups;