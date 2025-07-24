import style from "../../Molecules/RegistroBrigadasVacunacion/brigades.module.css"
import person from "../../../../../../assets/personaIcon.png"
import username from "../../../../../../assets/usernameIcon.png"
import password from "../../../../../../assets/passwordIcon.png"
import rol from "../../../../../../assets/rolIcon.png"
import groupIcon from "../../../../../../assets/groupIcon.png"
import { useModalBrigades } from "./ModalBrigadesContext"
import { useModalBrigadesVaccine } from "./ModalBrigadesVaccineContext"
import type { User } from "../../../../User/Domain/User"
import { useCreateUser } from "../../../../User/Presentation/Hooks/useCreateUsers"
import { useState } from "react"
import { useGetGroup } from "../../../../Group/Presentation/Hooks/useGetGroups"
import { useGetUserRole } from "../../../../User/Presentation/Hooks/useGetUserByRol"
function FormRegisterNurses() {
    const {abrirModal} = useModalBrigades()
    const {abrirModalVaccine} = useModalBrigadesVaccine()
    const { group, loadingGroup, errorGroup } = useGetGroup();
    const { usersRol, loadingRol, errorRol } = useGetUserRole();
    const { createUser, loading, error } = useCreateUser();
    const [formData, setFormData] = useState<User>({
      username: "",
      password: "",
      role: "",
      groupIdGroup: 0,
      name: "",
      lastname: "",
    })

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault();
        alert("proceso")
        try {
            await createUser({
                username: formData.username,
                password: formData.password,
                role: formData.role,
                groupIdGroup: formData.groupIdGroup,
                name: formData.name,
                lastname: formData.lastname,
            });
            
        } catch (err) {
            console.error("Error al registrar:", err);
            alert("Error al registrar usuario. Por favor intenta nuevamente.");
        }
    };

    const personal = [
  {
    id: 1,
    nombre: "Ana",
    apellido: "García",
    usuario: "anagarcia",
    password: "123456",
    rol: "Líder",
    grupo: "Grupo 1",
  },
  {
    id:2,
    nombre: "Luis",
    apellido: "Martínez",
    usuario: "luismtz",
    password: "abcdef",
    rol: "Enfermero",
    grupo: "Grupo 2",
  },
  {
    id:3,
    nombre: "Carlos",
    apellido: "Hernández",
    usuario: "charlieh",
    password: "qwerty",
    rol: "Enfermero",
    grupo: "Grupo 1",
  },
  {
    id:4,
    nombre: "Carlos",
    apellido: "Hernández",
    usuario: "charlieh",
    password: "qwerty",
    rol: "Enfermero",
    grupo: "Grupo 1",
  },
  {
    id:5,
    nombre: "Carlos",
    apellido: "Hernández",
    usuario: "charlieh",
    password: "qwerty",
    rol: "Enfermero",
    grupo: "Grupo 1",
  },
  {
    id:6,
    nombre: "Carlos",
    apellido: "Hernández",
    usuario: "charlieh",
    password: "qwerty",
    rol: "Enfermero",
    grupo: "Grupo 1",
  },
  {
    id:7,
    nombre: "Carlos",
    apellido: "Hernández",
    usuario: "charlieh",
    password: "qwerty",
    rol: "Enfermero",
    grupo: "Grupo 1",
  },
];


    return ( 
        <>
        <div className="mt-10 ml-12">
            <p className="text-2xl text-[#00000081]" id={style.title1}>
            Gestión de enfermeros y lideres
            </p>
            
        </div>
<main className="pb-6">
{/* DATOS PERSONALES */}
    <form onSubmit={registerUser}>
        <div className="flex flex-col sm:w-[90%] ml-7 mt-8">
                <label className="text-[2.4vh] mb-4 ml-1 font-medium ml-5">
                Datos Personales
                </label>

            <div className="flex flex-col sm:flex-row gap-6 pr-12 sm:pr-0">
                <div className="flex flex-col flex-1">
                    <div className="flex ml-6 gap-2">
                        <img src={person} className="w-5 h-5" alt="" />
                        <label htmlFor="fecha" className="text-sm text-gray-800 mb-1">
                        Nombre
                        </label>
                    </div>
                    <input
                    id="fecha"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full mt-1
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    />
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex ml-6 gap-2">
                        <img src={person} className="w-5 h-5" alt="" />
                    <label htmlFor="lugar" className="text-sm text-gray-800 mb-2">
                    Apellidos
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

{/* USUARIO */}
        <div className="flex flex-col sm:w-[90%] ml-7 mt-5">
                <label className="text-[2.4vh] mb-4 ml-1 font-medium ml-5">
                Usuario
                </label>

            <div className="flex flex-col sm:flex-row gap-6 pr-12 sm:pr-0">
                <div className="flex flex-col flex-1">
                    <div className="flex ml-6 gap-2">
                        <img src={username} className="w-5 h-5" alt="" />
                        <label htmlFor="fecha" className="text-sm text-gray-800 mb-1">
                        Nombre de usuario
                        </label>
                    </div>
                    <input
                    id="fecha"
                    type="text"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full mt-1
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    />
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex ml-6 gap-2">
                        <img src={password} className="w-5 h-5" alt="" />
                    <label htmlFor="lugar" className="text-sm text-gray-800 mb-2">
                    Password
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

{/* USUARIO */}
        <div className="flex flex-col sm:w-[62%] ml-7 mt-5">
                <label className="text-[2.4vh] mb-4 ml-1 font-medium ml-5">
                Usuario
                </label>

            <div className="flex flex-col sm:flex-row gap-6 pr-12 sm:pr-0">
                <div className="flex flex-col flex-1">
                    <div className="flex ml-6 gap-2">
                        <img src={rol} className="w-5 h-5" alt="" />
                        <label htmlFor="fecha" className="text-sm text-gray-800 mb-1">
                        Rol
                        </label>
                    </div>
                    <select
                    id="rol"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-[2vh] text-sm w-full sm:w-72 mt-1 ml-5
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    >
                    <option value="" disabled selected>
                        Selecciona un rol
                    </option>
                    <option value="Enfermero">Enfermero</option>
                    <option value="Lider">Líder</option>
                    </select>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex ml-6 gap-2">
                        <img src={groupIcon} className="w-5 h-5" alt="" />
                    <label htmlFor="lugar" className="text-sm text-gray-800 mb-2">
                    Grupo
                    </label>
                    </div>
                    <select
      id="grupo"
      value={formData.groupIdGroup ?? ""}
      onChange={(e) =>
        setFormData({ ...formData, groupIdGroup: Number(e.target.value) })
      }
      className="border border-gray-300 rounded-md px-3 py-[2vh] text-sm w-full sm:w-72 ml-5
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
      disabled={loadingGroup}
    >
      <option value="" disabled>
        {loadingGroup ? "Cargando grupos..." : "Selecciona un grupo"}
      </option>
      {group && group.length > 0 ? (
        group.map((group) => (
          <option key={group.idGroup} value={group.idGroup}>
            {group.nameGroup}
          </option>
        ))
      ) : (
        !loadingGroup && <option disabled>No hay grupos disponibles</option>
      )}
    </select>
                </div>

                <div className="mt-0 ml-6 sm:mt-8">
                <button type="submit"
                className="bg-[#1677FF] text-white py-3 px-4 sm:px-16 whitespace-nowrap rounded hover:bg-[#1677ffcc] transition cursor-pointer">
                    Agregar personal
                </button>
                </div>
            </div>
        </div>
    </form>
</main>

<main className="pr-10 pl-10 pb-10 sm:pb-7">
  <label className="text-[2.4vh] ml-1 font-medium">Usuarios agregados</label>

  {/* Scroll horizontal completo solo en pantallas pequeñas */}
  <div className="overflow-x-auto mt-4 sm:overflow-visible">
    {/* Scroll vertical solo para tbody en pantallas grandes */}
    <div className="sm:max-h-[30vh] sm:overflow-y-auto min-w-[800px]">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="sticky top-0 bg-white z-10">
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left text-sm">Nombre</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm">Apellido</th>
            <th className="border border-gray-300 px-2 py-2 text-left text-sm">Nombre de usuario</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm">Contraseña</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm">Rol</th>
            <th className="border border-gray-300 px-3 py-2 text-left text-sm">Grupo</th>
            <th className="border border-gray-300 px-4 py-2 text-center text-sm">Acciones</th>
          </tr>
        </thead>
        <tbody>
            {personal
              .filter((persona) => persona.rol === "enfermero" || persona.rol === "lider")
              .map((persona, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-sm">{persona.nombre}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{persona.apellido}</td>
                  <td className="border border-gray-300 px-2 py-2 text-sm">{persona.usuario}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{persona.password}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{persona.rol}</td>
                  <td className="border border-gray-300 px-3 py-2 text-sm">{persona.grupo}</td>
                  <td className="border border-gray-300 py-2 text-center flex justify-center">
                    <button className="cursor-pointer bg-yellow-400 text-white px-2 py-1 rounded text-sm hover:bg-yellow-500 mr-2">
                      Editar
                    </button>
                    <button className="cursor-pointer bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">
                      Eliminar
                    </button>
                  </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
</main>



        </>
    );
}

export default FormRegisterNurses;