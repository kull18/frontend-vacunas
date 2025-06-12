import style from "./../LoginMolecules/formLogin.module.css"
import clipboard from "../../../../../../assets/clipboard.png"
import inyection from "../../../../../../assets/injection.png"
function FormLogin() {

    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario
        console.log("Formulario enviado correctamente!");
    }

    return ( 
        <>
            <div className="bg-white w-full h-full absolute right-0 flex justify-center items-center" id={style.cuadro}>
                <img src={inyection} alt="" className="w-24 absolute opacity-10" id={style.inyection}/>
                <div className="absolute w-60 h-60 rounded-full bg-[#d9d9d955] z-10" id={style.circle}></div>
                <div className="absolute w-16 h-16 rounded-full bg-[#d9d9d955] z-10" id={style.circleSecond}></div>
                <div className="absolute w-7 h-7 rounded-full bg-[#d9d9d955] z-10" id={style.circleThirty}></div>

        <form onSubmit={login} className="bg-[#c4ecee63] z-50 w-[80vh] pl-7 pr-7 pt-10 pb-9 flex flex-col justify-center items-center rounded-[3vh]">
            <p className="text-[6vh] text-center text-[#585a61] mb-6 z-10" id={style.font}>Iniciar sesión</p>

            <input type="text" placeholder="Usuario"
                className="w-[70vh] bg-[#D8F7EB] rounded-full shadow-md 
                h-12 focus:bg-[#ddfbef] focus:outline-none p-4 text-[#585a61]"/>

            <input type="password" placeholder="Contraseña"
                className="w-[70vh] bg-[#D8F7EB] rounded-full shadow-md 
                h-12 focus:bg-[#ddfbef] focus:outline-none p-4 mt-6 text-[#585a61]"/>

                <button className="bg-[#9CD5F4] rounded-3xl mt-7 px-16 py-3 
                text-[#747d95] cursor-pointer hover:bg-[#93cae7] duration-75" 
                id={style.font}>ENTRAR</button>
                <div className="flex mt-4 text-[#0000004d]">
                <p>Aun no tienes cuenta? </p>
                <p className="text-[#2F5CE5] ml-1 cursor-pointer">Registrate</p>
                </div>
        </form>
                <div className="absolute w-28 h-28 rounded-md bg-[#d9d9d955] z-10" id={style.squared}></div>
                <img src={clipboard} alt="" className="w-24 absolute opacity-10" id={style.clipboard}/>
            </div>
        </>
    );
}

export default FormLogin;
