import style from "../../Molecules/RegistroBrigadasVacunacion/brigades.module.css"
import calender from "../../../../../../assets/calender.png"
import time from "../../../../../../assets/reloj.png"
import enfermeros from "../../../../../../assets/enfermeros.png"
import vacunas from "../../../../../../assets/vacunas.png"
import ubicacion from "../../../../../../assets/ubication.png"
import { useModalBrigades } from "./ModalBrigadesContext"
import { useModalBrigadesVaccine } from "./ModalBrigadesVaccineContext"
function FormRegisterBrigades() {
    const {abrirModal} = useModalBrigades()
    const {abrirModalVaccine} = useModalBrigadesVaccine()
    return ( 
        <>
        <div className="mt-10 ml-12">
            <p className="text-2xl text-[#00000081]" id={style.title1}>
            Registro enfermeros
            </p>
        </div>
<main className="pb-6">

        <div className="flex flex-col w-[44vh] sm:w-[156vh] ml-7 mt-7">
            <label htmlFor="nombre" className="text-[2.4vh] mb-2 ml-5 font-medium">
            Lugar de la brigada
            </label>
            <input
            id="nombre"
            type="text"
            className="border border-gray-300 rounded-md px-3 py-2 w-full mt-1 max-h-11
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
            placeholder="Ej. Covid-19"/> 
        </div>

{/* PROGRAMACION */}
    <div>
        <div className="flex flex-col sm:w-[90%] ml-7 mt-9">
                <label className="text-[2.4vh] mb-4 ml-1 font-medium ml-5">
                Programación
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

                <div className="flex flex-col flex-1">
                    <div className="flex ml-6 gap-2">
                        <img src={ubicacion} className="w-5 h-5" alt="" />
                    <label htmlFor="lugar" className="text-sm text-gray-800 mb-2">
                    Lugar
                    </label>
                    </div>
                    <input
                    id="lugar"
                    type="text"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm w-72
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    placeholder="Ej. Centro de salud"
                    />
                </div>
            </div>
        </div>

{/* HORARIOS */}
        <div className="flex flex-col sm:w-[90%] ml-7 mt-9">
                <label className="text-[2.4vh] mb-4 ml-1 font-medium ml-5">
                Horarios
                </label>
            <div className="flex flex-col sm:flex-row gap-6 pr-12 sm:pr-[80vh]">
                <div className="flex flex-col flex-1">
                    <div className="flex ml-6 gap-2">
                        <img src={time} className="w-5 h-5" alt="" />
                        <label htmlFor="fecha" className="text-sm text-gray-800 mb-2">
                        Horario de inicio
                        </label>
                    </div>

                    
                    <input
                    id="fecha"
                    type="time"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    />
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex ml-6 gap-2">
                        <img src={time} className="w-5 h-5" alt="" />
                    <label htmlFor="lugar" className="text-sm text-gray-800 mb-2">
                    Horario de fin
                    </label>
                    </div>
                    <input
                    id="lugar"
                    type="time"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    placeholder="Ej. Centro de salud"
                    />
                </div>
            </div>   
        </div>

{/*PERSONAL MEDICO**/}
        <div className="flex flex-col sm:w-[90%] ml-7 mt-9">
                <label className="text-[2.4vh] mb-4 font-medium ml-5">
                Personal medico
                </label>

                <div className="flex flex-col sm:flex-row gap-6 pr-12 sm:pr-0">
                <div className="flex flex-col flex-1">
                    <div className="flex ml-6 gap-2">
                        <img src={enfermeros} className="w-5 h-5" alt="" />
                    <label htmlFor="fecha" className="text-sm text-gray-800 mb-2">
                    Enfermeros
                    </label>
                    </div>
                    <div className="h-11 border-dashed border-2 ml-6 rounded-md 
                    border-[#43aaf489] flex justify-center items-center hover:bg-[#7ab5e019] 
                    duration-150 cursor-pointer" title="Gestionar Enfermeros" onClick={abrirModal}>
                        <p className="text-2xl text-[#43aaf474]">+</p>
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex ml-6 gap-2">
                    <img src={vacunas} className="w-5 h-5" alt="" />
                    <label htmlFor="lugar" className="text-sm text-gray-800 mb-2">
                    Vacunas
                    </label>
                    </div>
                    <div className="h-11 border-dashed border-2 ml-6 rounded-md border-[#9b27b05b] hover:bg-[#9b27b00f]
                    flex justify-center items-center duration-150 cursor-pointer" title="Gestionar Vacunas" onClick={abrirModalVaccine}>
                        <p className="text-2xl text-[#9b27b05b]">+</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex justify-end pr-0 mt-7 sm:pr-24">
        <button className="bg-[#1677FF] text-white py-3 px-1 sm:px-7 rounded min-w-10 hover:bg-[#1677ffcc] transition cursor-pointer">
                Registrar brigada de vacunación
        </button>
        </div>
        
    </div>
</main>
        </>
    );
}

export default FormRegisterBrigades;