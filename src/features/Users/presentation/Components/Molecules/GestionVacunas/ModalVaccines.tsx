import { useModalVaccines } from "./ModalVaccineContext";
import x from "../../../../../../assets/x.png"
function ModalVaccines() {
    const {cerrarModal} = useModalVaccines();
    return ( 
        <>
            <div className="fixed inset-0 bg-[#0000002b] backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white w-[50vh] sm:w-[86vh] rounded-lg shadow-xl p-6 pl-5 border-2 border-[#c0c0c0]">

        <div className="flex justify-between items-center mb-4 pr-4 pt-3">
        <p className="text-2xl font-semibold text-[#1f3445] ml-5">Agregar vacuna</p>
        <img
            src={x} 
            alt="Cerrar"
            className="w-4 cursor-pointer opacity-70 hover:opacity-40 transition-opacity"
            onClick={cerrarModal}
        />
        </div>

        <div className="flex gap-4 py-2">
        <div className="flex flex-col w-[30vh] sm:w-[60vh]">
            <label htmlFor="nombre" className="text-sm text-gray-800 mb-1 ml-5">
            Tipo de vacuna
            </label>
            <input
        id="nombre"
        type="text"
        className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm 
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
        placeholder="Ej. Covid-19"
        />

        </div>

        <div className="flex flex-col w-[12vh]">
            <label htmlFor="edad" className="text-sm text-gray-700 mb-1 ml-5">
            Edad
            </label>
            <input
            id="edad"
            type="number"
            className="border border-gray-300 rounded px-2 py-1 w-full text-sm focus:outline-none
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
            placeholder="25"
            />
        </div>
        </div>


        <div className="flex gap-5 mt-3">
            <div className="flex flex-col w-[40vh]">
            <label htmlFor="nombre" className="text-sm text-gray-800 mb-1 ml-5">
            Dosis disponible
            </label>
            <input
        id="nombre"
        type="number"
        className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm 
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
        placeholder="Ej. 10"
        />

        </div>
            <div className="flex flex-col w-[32vh]">
            <label htmlFor="vacuna" className="text-sm text-gray-700 mb-1 ml-5">
                Dosi aplicada
            </label>
            <input
        id="nombre"
        type="number"
        className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm 
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
        placeholder="Ej. 10"
        />
            </div>
        </div>

        <div className="ml-5 mt-8 mr-4">
        <button className="bg-[#1677FF] text-white py-2 px-4 rounded w-full hover:bg-[#1677ffcc] transition cursor-pointer">
            Agregar
        </button>

        </div>
    </div>
</div>
        </>
    );
}

export default ModalVaccines;