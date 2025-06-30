import style from "../LoginMolecules/formLogin.module.css"
function FormRegister({ onClick }: { onClick: () => void }) {

        async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario
        console.log("Formulario enviado correctamente!");
    }

    return ( 
        <>
        <form onSubmit={login} className="bg-[#c4ecee63] z-50 w-[80vh] pl-7 pr-7 pt-10 pb-9 flex flex-col justify-center items-center rounded-[3vh]">
            <p className="text-[6vh] text-center text-[#585a61] mb-6 z-10" id={style.font}>Registrate</p>
            <input type="text" placeholder="Nombre"
                className="w-[70vh] bg-[#D8F7EB] rounded-full shadow-md 
                h-12 focus:bg-[#ddfbef] focus:outline-none p-4 text-[#585a61]"/>

            <input type="text" placeholder="Apellidos"
                className="w-[70vh] bg-[#D8F7EB] rounded-full shadow-md 
                h-12 focus:bg-[#ddfbef] focus:outline-none p-4 mt-6 text-[#585a61]"/>

            <input type="text" placeholder="Correo electronico"
                className="w-[70vh] bg-[#D8F7EB] rounded-full shadow-md 
                h-12 focus:bg-[#ddfbef] focus:outline-none p-4 mt-6 text-[#585a61]"/>

            <input type="password" placeholder="Contraseña"
                className="w-[70vh] bg-[#D8F7EB] rounded-full shadow-md 
                h-12 focus:bg-[#ddfbef] focus:outline-none p-4 mt-6 text-[#585a61]"/>

                <button className="bg-[#9CD5F4] rounded-3xl mt-7 px-16 py-3 
                text-[#747d95] cursor-pointer hover:bg-[#93cae7] duration-75" 
                id={style.font}>REGISTRATE</button>
                <div className="flex mt-4 text-[#0000004d]">
                <p>Ya estas registrado? </p>
                <p className="text-[#2F5CE5] ml-1 cursor-pointer" onClick={onClick}>Iniciar sesión</p>
                </div>
            </form>
        </>
    );
}

export default FormRegister;