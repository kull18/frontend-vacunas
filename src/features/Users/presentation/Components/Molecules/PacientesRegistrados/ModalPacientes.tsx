import { useModal } from "./ModalContext";
import x from "../../../../../../assets/x.png"
import { useState } from "react";
function ModalPacientes() {
    const [enviarFicha, setEnviarFicha] = useState(false);
    const {cerrarModal} = useModal()

    const sendInformation = () => {
  if (enviarFicha) {
    alert("Agregando y enviando ficha al paciente");
  } else {
    alert("Agregando paciente");
  }
};

    return ( 
        <>
    <div className="fixed inset-0 bg-[#0000002c] backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white w-[50vh] sm:w-[86vh] rounded-lg shadow-xl p-6 pl-5 border-2 border-[#c0c0c0]">

        <div className="flex justify-between items-center mb-4 pr-4 pt-3">
        <p className="text-2xl font-semibold text-[#1f3445] ml-5">Agregar paciente</p>
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
            Nombre del paciente
            </label>
            <input
        id="nombre"
        type="text"
        className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm 
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
        placeholder="Ej. Lucía"
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


        <div className="flex gap-9 mt-3">
            <div className="flex flex-col w-[40vh]">
            <label htmlFor="nombre" className="text-sm text-gray-800 mb-1 ml-5">
            Hora de registro
            </label>
            <input
        id="nombre"
        type="text"
        className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm 
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
        placeholder="Ej. Lucía"
        />

        </div>
            <div className="flex flex-col w-[32vh]">
            <label htmlFor="vacuna" className="text-sm text-gray-700 mb-1">
                Vacuna aplicada
            </label>
            <select
                id="vacuna"
                className="border border-gray-300 rounded px-2 h-13 py-1 w-full text-sm focus:outline-none
                focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150 bg-white"
            >
                <option value="">Selecciona vacuna</option>
                <option value="influenza">Influenza Quadrivalente</option>
                <option value="sars">SARS-CoV-2 Variante XBB</option>
                <option value="hepatitis">Hepatitis B Recombinante</option>
                <option value="pcv13">PCV13</option>
                <option value="tdap">Tdap</option>
            </select>
            </div>
        </div>

        <div className="flex gap-9 mt-3">
            <div className="flex flex-col w-[40vh]">
            <label htmlFor="nombre" className="text-sm text-gray-800 mb-1 ml-5">
            Resultado de alcoholemia
            </label>
            <select
                id="resultado"
                className="border border-gray-300 rounded px-2 h-13 py-1 w-full ml-5 text-sm focus:outline-none
                focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150 bg-white"
            >
                <option value="positivo">Selecciona el resultado de alcoholemia</option>
                <option value="positivo">Positivo</option>
                <option value="negativo">Negativo</option>
            </select>

        </div>
            <div className="flex flex-col w-[32vh]">
            <label htmlFor="vacuna" className="text-sm text-gray-700 mb-1">
                Dosi aplicada
            </label>
            <select
                id="vacuna"
                className="border border-gray-300 rounded px-2 h-13 py-1 w-full text-sm focus:outline-none
                focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150 bg-white"
            >
                <option value="">1</option>
                <option value="influenza">2</option>
                <option value="sars">3</option>
                <option value="hepatitis">4</option>
                <option value="pcv13">5</option>
                <option value="tdap">6</option>
            </select>
            </div>
        </div>

        <label className="inline-flex items-center cursor-pointer ml-5 mt-2">
        <input
            type="checkbox"
            className="sr-only peer"
            checked={enviarFicha}
            onChange={() => setEnviarFicha(!enviarFicha)}
        />
        <div className={`w-4 h-4 border border-gray-300 rounded bg-white peer-checked:bg-blue-500 flex items-center justify-center`}>
            {enviarFicha && (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            )}
        </div>
        <span className="ml-2 text-sm text-gray-700">Enviar ficha al paciente</span>
        </label>

        <div className="ml-5 mt-4 mr-4">
            <button className="bg-[#1677FF] text-white py-2 px-4 rounded w-full hover:bg-[#1677ffcc] transition cursor-pointer"
                onClick={sendInformation}>
                {enviarFicha ? "Agregar y enviar ficha" : "Agregar"}
            </button>
        </div>

    </div>
</div>

        </>
    );
}

export default ModalPacientes;