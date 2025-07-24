import style from "./../LoginMolecules/formLogin.module.css"
import { useNavigate } from "react-router-dom";
import type { UserLogin } from "../../../../User/Domain/User";
import { useLoginUser } from "../../../../User/Presentation/Hooks/useLoginUsers";
import { useState } from "react";
import { userAuth } from "../../../../User/Presentation/Hooks/AuthUser";
import { useAuth } from "../../../../User/Presentation/Hooks/AuthProvider";
function FormLogin() {
    const navigate = useNavigate();
    const { setUser } = userAuth();
    const { setToken  } = useAuth()

    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario
        console.log("Formulario enviado correctamente!");
    }


    const { loginUser, loading, error } = useLoginUser();
    const [formData, setFormData] = useState<UserLogin>({
        username: "",
        password: "",
    })

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault();
        alert("proceso")
         try {
        const { token, body } = await loginUser(formData);

       if (!body.role) {
                throw new Error("La respuesta del servidor no incluye el rol");
            }

        const role = body.role.toLowerCase();
        setUser(body)
        setToken(token)
        localStorage.setItem("TokenU", token)
        // 🔀 Redirección según el rol
        switch (role) {
            case "enfermero":
                console.log("ROLE", role)
                navigate("/dashboard/tabla-pacientes-registrados/enfermero");
                break;
            case "paciente":
                navigate("/dashboard/Historial-vacunacion/paciente");
                break;
            case "director":
                navigate("/dashboard/brigadas/administrador");
                break;
            default:
                alert("Rol no reconocido. Redirección cancelada.");
                break;
        }
    } catch (err) {
        console.error("Error en login:", err);
        alert("Error al iniciar sesión. Verifica tus credenciales.");
    }
    };

    return ( 
        <>


        <form onSubmit={login} className="bg-[#cdcdcd30] z-50 w-[80vh] pl-7 pr-7 pt-10 pb-9 flex flex-col justify-center items-center rounded-[3vh]">
            <p className="text-[6vh] text-center text-[#585a61] mb-6 z-10" id={style.font}>Iniciar sesión</p>

            <input
                    id="lugar"
                    type="text"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    placeholder="Nombre de usuario"
                    value={formData.username}
                    onChange={(e) =>
                        setFormData((prev) => ({ ...prev, username: e.target.value }))
                    }
                    />

            <input
                    id="lugar"
                    type="password"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm mt-6
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData((prev) => ({ ...prev, password: e.target.value }))
                    }
                    />

                <button className="bg-[#9CD5F4] rounded-3xl mt-7 px-16 py-3 
                text-[#747d95] cursor-pointer hover:bg-[#93cae7] duration-75" 
                id={style.font} onClick={registerUser}>ENTRAR</button>
        </form>

        </>
    );
}

export default FormLogin;
