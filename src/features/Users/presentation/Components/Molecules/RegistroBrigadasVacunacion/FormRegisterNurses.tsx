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
import Swal from "sweetalert2"
import { useDeleteUser } from "../../../../User/Presentation/Hooks/useDeleteUser"
import { useUpdateUserCivil } from "../../../../User/Presentation/Hooks/useUpdateUserCivil"
function FormRegisterNurses() {
    const {abrirModal} = useModalBrigades()
    const {abrirModalVaccine} = useModalBrigadesVaccine()
    const { group, loadingGroup, errorGroup } = useGetGroup();
    const { users, loadingRole, error,refetch } = useGetUserRole();
    const { createUser, createdUser, loading, errorCreate } = useCreateUser();
    const { deleteUser, loading: deleting, error: deleteError } = useDeleteUser();
    const { updateUserCivil, error: updateError } = useUpdateUserCivil();
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState<User>({
      idUser: 0,
      name: "",
      lastname: "",
      username: "",
      password: "",
      role: "",
      groupIdGroup: null,
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (user: User) => {
    const normalizedRole = user.role === "Líder" ? "Lider" : user.role;
    setFormData({
      ...user,
      role: normalizedRole,
    });
    setIsEditing(true);
  };

const postUser = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!formData.groupIdGroup || formData.groupIdGroup === 0) {
    Swal.fire("Error", "Debes seleccionar un grupo", "error");
    return;
  }

  if (!formData.role || formData.role === "") {
    Swal.fire("Error", "Debes seleccionar un rol", "error");
    return;
  }

  const normalizedRole = formData.role === "Lider" ? "Líder" : formData.role;

  // Crea un nuevo objeto SIN idUser y con groupIdGroup
  const userData = {
    name: formData.name,
    lastname: formData.lastname,
    username: formData.username,
    password: formData.password,
    role: normalizedRole,
    groupIdGroup: formData.groupIdGroup // Asegúrate de que esto tiene el valor correcto
  };

  console.log("Datos a enviar:", userData); // Verifica en consola

  try {
    await createUser(userData as User);
    setFormData({
      idUser: 0,
      name: "",
      lastname: "",
      username: "",
      password: "",
      role: "",
      groupIdGroup: 0,
    });
    await refetch();
    Swal.fire("Éxito", "Usuario creado correctamente", "success");
  } catch (error) {
    console.error("Error al crear usuario:", error);
    Swal.fire("Error", "No se pudo crear el usuario", "error");
  }
};

const deletedUser = async (id: number) => {
    const token = localStorage.getItem('token'); // O tu método de obtener token
    
    const confirmed = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
    });

    if (!confirmed.isConfirmed) return;

    const success = await deleteUser(id, token);
    
    if (success) {
        Swal.fire(
            '¡Eliminado!',
            'El usuario ha sido eliminado.',
            'success'
        );
        // Actualizar lista de usuarios aquí
        await refetch();
    } else if (deleteError) {
        Swal.fire(
            'Error',
            `No se pudo eliminar: ${deleteError}`,
            'error'
        );
    }
};

const updateUser = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.groupIdGroup || formData.groupIdGroup === 0) {
    Swal.fire("Error", "Debes seleccionar un grupo", "error");
    return;
  }

  const normalizedRole = formData.role === "Lider" ? "Líder" : formData.role;
  const userData = {
    name: formData.name,
    lastname: formData.lastname,
    username: formData.username,
    password: formData.password,
    role: normalizedRole,
    groupIdGroup: formData.groupIdGroup
  };

  try {
    if (isEditing && formData.idUser) {
      // Lógica para EDITAR usuario existente
      await updateUserCivil(formData.idUser, userData);
      Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
    } else {
      // Lógica para CREAR nuevo usuario
      await createUser(userData as User);
      Swal.fire("Éxito", "Usuario creado correctamente", "success");
    }

    // Resetear formulario después de cualquier operación
    setFormData({
      idUser: 0,
      name: "",
      lastname: "",
      username: "",
      password: "",
      role: "",
      groupIdGroup: null,
    });
    setIsEditing(false);
    await refetch(); // Actualizar la lista de usuarios
  } catch (error) {
    console.error("Error:", error);
    Swal.fire("Error", `No se pudo ${isEditing ? "actualizar" : "crear"} el usuario`, "error");
  }
};

    return ( 
        <>
        <div className="mt-10 ml-12">
            <p className="text-2xl text-[#00000081]" id={style.title1}>
            Gestión de enfermeros y lideres
            </p>
            
        </div>
<main className="pb-6">
{/* DATOS PERSONALES */}
    <form onSubmit={updateUser}>
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
                    value={formData.lastname}
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
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
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                      value={formData.role || ""}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="border border-gray-300 rounded-md px-3 py-[2vh] text-sm w-full sm:w-72 mt-1 ml-5
                          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150"
                    >
                      <option value="" disabled>
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
                    value={formData.groupIdGroup ?? ""}
                    onChange={(e) => setFormData({ ...formData, groupIdGroup: Number(e.target.value) })}
                    id="grupo"
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

                <div className="mt-0 ml-6 sm:mt-8 flex gap-4">
  {isEditing && (
    <button
      type="button"
      onClick={() => {
        setIsEditing(false);
        setFormData({
          idUser: 0,
          name: "",
          lastname: "",
          username: "",
          password: "",
          role: "",
          groupIdGroup: null,
        });
      }}
      className="bg-gray-500 text-white py-3 px-4 rounded hover:bg-gray-600 transition cursor-pointer"
    >
      Cancelar
    </button>
  )}
  <button
    type="submit"
    className={`py-3 px-4 sm:px-16 whitespace-nowrap rounded transition cursor-pointer ${
      isEditing 
        ? "bg-purple-600 hover:bg-purple-700 text-white"
        : "bg-[#1677FF] hover:bg-[#1677ffcc] text-white"
    }`}
  >
    {isEditing ? "Editar personal" : "Agregar personal"}
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
            <th className="border border-gray-300 px-4 py-2 text-left text-sm">Rol</th>
            <th className="border border-gray-300 px-3 py-2 text-left text-sm">Grupo</th>
            <th className="border border-gray-300 px-4 py-2 text-center text-sm">Acciones</th>
          </tr>
        </thead>
        <tbody>
            {users
              .map((persona, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-sm">{persona.name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{persona.lastname}</td>
                  <td className="border border-gray-300 px-2 py-2 text-sm">{persona.username}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{persona.role}</td>
                  <td className="border border-gray-300 px-3 py-2 text-sm">{persona.groupName}</td>
                  <td className="border border-gray-300 py-2 text-center flex justify-center">
                    <button 
                    onClick={() => handleEdit(persona)}
                    className="cursor-pointer bg-yellow-400 text-white px-2 py-1 rounded text-sm hover:bg-yellow-500 mr-2">
                      Editar
                    </button>
                    <button className="cursor-pointer bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                    onClick={() => deletedUser(persona.idUser)}>
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