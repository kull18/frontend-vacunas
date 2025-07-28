import calender from "../../../../../../assets/calender.png"
import style from "../../Molecules/RegistroBrigadasVacunacion/brigades.module.css"
import location from "../../../../../../assets/location.png"
import ubication from "../../../../../../assets/ubication.png"
import { useModalBrigades } from "../RegistroBrigadasVacunacion/ModalBrigadesContext"
function FormRegisterBrigade() {
    const {abrirModal} = useModalBrigades()
    return ( 
        <>
         <div className="mt-10 mx-5 flex flex-col sm:flex-row sm:justify-between sm:items-center ml-10">
                <p className="text-2xl text-[#00000081]" id={style.title1}>
                    Registro de Brigada de Vacunación
                </p>
        </div>
            <main className="pb-6">

        <div className="flex flex-col w-[44vh] sm:w-[156vh] ml-7 mt-7">
            <label htmlFor="nombre" className="text-[2.4vh] mb-2 ml-5 font-medium">
            Nombre de la brigada
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
                Localización
                </label>

             <div className="h-11 border-dashed border-2 ml-6 rounded-md border-[#9b27b05b] hover:bg-[#9b27b00f]
                    flex justify-center items-center duration-150 cursor-pointer" title="Gestionar Vacunas" onClick={abrirModal}>
                        <p className="text-2xl text-[#9b27b05b]">+</p>
                    </div>
        </div>
        </div>

{/*PERSONAL MEDICO**/}

        <div className="flex justify-end pr-0 mt-7 sm:pr-24">
        <button className="bg-[#1677FF] text-white py-3 px-1 sm:px-7 rounded min-w-10 hover:bg-[#1677ffcc] transition cursor-pointer">
                Registrar brigada de vacunación
        </button>
        </div>
        
    
</main>
        </>
     );
}

export default FormRegisterBrigade;