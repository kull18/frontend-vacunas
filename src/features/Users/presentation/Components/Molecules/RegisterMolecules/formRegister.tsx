import { useCreateUser } from "../../../../User/Presentation/Hooks/useCreateUsers";
import style from "../LoginMolecules/formLogin.module.css"
import { useState } from "react";
import type { UserForm } from "../../../../User/Domain/User";
function FormRegister({ onClick }: { onClick: () => void }) {

        const { createUser, loading, error } = useCreateUser();

        const [formData, setFormData] = useState<UserForm>({
        username: "",
        password: "",
        role: "",
        name: "",
        lastname: "",
        });


        const registerUser = async (e: React.FormEvent) => {
        e.preventDefault();
        alert("proceso")
        try {
            await createUser({
                username: formData.username,
                password: formData.password,
                role: formData.role,
                groupIdGroup: 1, // O asigna el valor adecuado según tu lógica
                name: formData.name,
                lastname: formData.lastname,
                // Agrega otros campos necesarios según tu API
            });
            
            // Opcional: Redirección o mensaje de éxito
            alert("Usuario registrado exitosamente!");
            
        } catch (err) {
            console.error("Error al registrar:", err);
            // El error ya está manejado por el hook, pero puedes mostrar un mensaje específico
            alert("Error al registrar usuario. Por favor intenta nuevamente.");
        }
    };

    return ( 
        <>
        <form onSubmit={registerUser} className="bg-[#cdcdcd30] z-50 w-[80vh] gap-y-5 pl-7 pr-7 pt-10 pb-9 flex flex-col justify-center items-center rounded-[3vh]">
            <p className="text-[6vh] text-center text-[#585a61] z-10" id={style.font}>Registrate</p>
            <input
                    id="lugar"
                    type="text"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />

            <input
                    id="lugar"
                    type="text"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    placeholder="Apellidos"
                    value={formData.lastname}
                    onChange={e => setFormData({ ...formData, lastname: e.target.value })}
                    />

            <input
                    id="lugar"
                    type="text"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    placeholder="Nombre de usuario"
                    value={formData.username}
                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                    />


            <input
                    id="lugar"
                    type="password"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />

                <button className="bg-[#9CD5F4] rounded-3xl px-16 py-3 
                text-[#747d95] cursor-pointer hover:bg-[#93cae7] duration-75" 
                id={style.font} 
                type="submit"> {loading ? "REGISTRANDO..." : "REGISTRATE"}</button>
                <div className="flex text-[#0000004d] mb-3">
                <p>Ya estas registrado? </p>
                <p className="text-[#2F5CE5] ml-1 cursor-pointer" onClick={onClick}>Iniciar sesión</p>
                </div>
            </form>
        </>
    );
}

export default FormRegister;