import style from "./../LoginMolecules/formLogin.module.css"
import { useNavigate } from "react-router-dom";
function FormLogin({ onClick }: { onClick: () => void }) {
    const navigate = useNavigate();
    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario
        console.log("Formulario enviado correctamente!");
    }

    const goHome = ()=>{
        navigate("/dashboard/historial-vacunacion/paciente")
    }

    return ( 
        <>


        <form onSubmit={login} className="bg-[#cdcdcd30] z-50 w-[80vh] pl-7 pr-7 pt-10 pb-9 flex flex-col justify-center items-center rounded-[3vh]">
            <p className="text-[6vh] text-center text-[#585a61] mb-6 z-10" id={style.font}>Iniciar sesión</p>

            <input
                    id="lugar"
                    type="text"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    placeholder="Correo"
                    />

            <input
                    id="lugar"
                    type="text"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm mt-6
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    placeholder="Contraseña"
                    />

                <button className="bg-[#9CD5F4] rounded-3xl mt-7 px-16 py-3 
                text-[#747d95] cursor-pointer hover:bg-[#93cae7] duration-75" 
                id={style.font} onClick={goHome}>ENTRAR</button>
                <div className="flex mt-4 text-[#0000004d]">
                <p>Aun no tienes cuenta? </p>
                <p className="text-[#2F5CE5] ml-1 cursor-pointer" onClick={onClick}>Registrate</p>
                </div>
        </form>

        </>
    );
}

export default FormLogin;
