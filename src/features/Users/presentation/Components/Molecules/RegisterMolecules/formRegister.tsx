import style from "../LoginMolecules/formLogin.module.css"
function FormRegister({ onClick }: { onClick: () => void }) {

        async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario
        console.log("Formulario enviado correctamente!");
    }

    return ( 
        <>
        <form onSubmit={login} className="bg-[#cdcdcd30] z-50 w-[80vh] gap-y-5 pl-7 pr-7 pt-10 pb-9 flex flex-col justify-center items-center rounded-[3vh]">
            <p className="text-[6vh] text-center text-[#585a61] z-10" id={style.font}>Registrate</p>
            <input
                    id="lugar"
                    type="text"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    placeholder="Nombre"
                    />

            <input
                    id="lugar"
                    type="Apellidos"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    placeholder="Apellidos"
                    />

            <input
                    id="lugar"
                    type="text"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    placeholder="Correo electronico"
                    />

            <input
                    id="lugar"
                    type="password"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    placeholder="Contraseña"
                    />

                <div className="flex flex-col items-start -mb-10 w-full px-2 z-50">
                    <p className="text-[#15161797] text-base font-medium">Registrate como</p>
                    
                    <div className="flex">
                    <label className="flex items-center gap-2 text-sm text-gray-700 mb-5 cursor-pointer">
                        <input type="radio" name="rol" value="paciente" className="accent-[#1677FF]" />
                        Paciente
                    </label>

                    <label className="flex items-center gap-2 text-sm text-gray-700 mb-5 cursor-pointer">
                        <input type="radio" name="rol" value="enfermero" className="accent-[#1677FF]" />
                        Enfermero
                    </label>
                    </div>
                </div>


                <button className="bg-[#9CD5F4] rounded-3xl px-16 py-3 
                text-[#747d95] cursor-pointer hover:bg-[#93cae7] duration-75" 
                id={style.font}>REGISTRATE</button>
                <div className="flex text-[#0000004d] mb-3">
                <p>Ya estas registrado? </p>
                <p className="text-[#2F5CE5] ml-1 cursor-pointer" onClick={onClick}>Iniciar sesión</p>
                </div>
            </form>
        </>
    );
}

export default FormRegister;