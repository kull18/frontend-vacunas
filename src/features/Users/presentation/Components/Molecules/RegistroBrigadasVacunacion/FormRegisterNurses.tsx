import { useState, useTransition, useMemo, Suspense, useCallback } from "react";
import style from "../../Molecules/RegistroBrigadasVacunacion/brigades.module.css";
import person from "../../../../../../assets/personaIcon.png";
import username from "../../../../../../assets/usernameIcon.png";
import password from "../../../../../../assets/passwordIcon.png";
import rol from "../../../../../../assets/rolIcon.png";
import groupIcon from "../../../../../../assets/groupIcon.png";
import { useModalBrigades } from "./ModalBrigadesContext";
import { useModalBrigadesVaccine } from "./ModalBrigadesVaccineContext";
import type { User } from "../../../../User/Domain/User";
import { useCreateUser } from "../../../../User/Presentation/Hooks/useCreateUsers";
import { useGetGroup } from "../../../../Group/Presentation/Hooks/useGetGroups";
import { useGetUserRole } from "../../../../User/Presentation/Hooks/useGetUserByRol";
import Swal from "sweetalert2";
import { useDeleteUserCivil } from "../../../../User/Presentation/Hooks/useUserCivilDeleteUser";
import { useUpdateUserCivil } from "../../../../User/Presentation/Hooks/useUpdateUserCivil";

// Loading Skeleton Component
function FormLoadingSkeleton() {
  return (
    <>
      <div className="mt-10 ml-12">
        <div className="h-8 w-96 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <main className="pb-6">
        <div className="flex flex-col sm:w-[90%] ml-7 mt-8">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1 h-10 bg-gray-100 rounded animate-pulse"></div>
            <div className="flex-1 h-10 bg-gray-100 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="flex flex-col sm:w-[90%] ml-7 mt-5">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1 h-10 bg-gray-100 rounded animate-pulse"></div>
            <div className="flex-1 h-10 bg-gray-100 rounded animate-pulse"></div>
          </div>
        </div>
      </main>

      <main className="pr-10 pl-10 pb-10">
        <div className="h-96 bg-gray-100 rounded animate-pulse"></div>
      </main>
    </>
  );
}

// Main Content Component
function FormContent() {
  const { abrirModal } = useModalBrigades();
  const { abrirModalVaccine } = useModalBrigadesVaccine();
  const { group, loadingGroup, errorGroup } = useGetGroup();
  const { users, loadingRole, error, refetch } = useGetUserRole();
  const { createUser, createdUser, loading } = useCreateUser();
  const { deleteUser, loading: deleting, error: deleteError } = useDeleteUserCivil();
  const { updateUserCivil, error: updateError } = useUpdateUserCivil();
  
  const [isPending, startTransition] = useTransition();
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

  // Memoizar los usuarios para evitar re-renders
  const memoizedUsers = useMemo(() => users || [], [users]);

  // Memoizar los grupos
  const memoizedGroups = useMemo(() => group || [], [group]);

  const handleEdit = useCallback((user: User) => {
    const normalizedRole = user.role === "Líder" ? "Lider" : user.role;
    setFormData({
      ...user,
      role: normalizedRole,
    });
    setIsEditing(true);
  }, []);

  const resetForm = useCallback(() => {
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
  }, []);

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

    const userData = {
      name: formData.name,
      lastname: formData.lastname,
      username: formData.username,
      password: formData.password,
      role: normalizedRole,
      groupIdGroup: formData.groupIdGroup
    };

    console.log("Datos a enviar:", userData);

    try {
      await createUser(userData as User);
      resetForm();
      
      startTransition(() => {
        refetch();
      });
      
      Swal.fire("Éxito", "Usuario creado correctamente", "success");
    } catch (error) {
      console.error("Error al crear usuario:", error);
      Swal.fire("Error", "No se pudo crear el usuario", "error");
    }
  };

  const deletedUser = async (id: number) => {
    const confirmed = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!confirmed.isConfirmed) return;

    const success = await deleteUser(id, token);
    
    if (success) {
      Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
      
      startTransition(() => {
        refetch();
      });
    } else if (deleteError) {
      Swal.fire('Error', `No se pudo eliminar: ${deleteError}`, 'error');
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
        await updateUserCivil(formData.idUser, userData);
        Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
      } else {
        await createUser(userData as User);
        Swal.fire("Éxito", "Usuario creado correctamente", "success");
      }

      resetForm();
      
      startTransition(() => {
        refetch();
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", `No se pudo ${isEditing ? "actualizar" : "crear"} el usuario`, "error");
    }
  };

  return (
    <>
      <div className="mt-10 ml-12">
        <div className="flex items-center gap-3">
          <p className="text-2xl text-[#00000081]" id={style.title1}>
            Gestión de enfermeros y líderes
          </p>
          {isPending && (
            <div className="flex items-center gap-2 text-blue-600">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Actualizando...</span>
            </div>
          )}
        </div>
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
                  <label htmlFor="nombre" className="text-sm text-gray-800 mb-1">
                    Nombre
                  </label>
                </div>
                <input
                  id="nombre"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isPending}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full mt-1
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150
                    disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex ml-6 gap-2">
                  <img src={person} className="w-5 h-5" alt="" />
                  <label htmlFor="apellidos" className="text-sm text-gray-800 mb-2">
                    Apellidos
                  </label>
                </div>
                <input
                  id="apellidos"
                  type="text"
                  value={formData.lastname}
                  onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                  disabled={isPending}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-72
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150
                    disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Ej. García López"
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
                  <label htmlFor="username" className="text-sm text-gray-800 mb-1">
                    Nombre de usuario
                  </label>
                </div>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  disabled={isPending}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full mt-1
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150
                    disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex ml-6 gap-2">
                  <img src={password} className="w-5 h-5" alt="" />
                  <label htmlFor="password" className="text-sm text-gray-800 mb-2">
                    Password
                  </label>
                </div>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={isPending}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-72
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150
                    disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Contraseña segura"
                />
              </div>
            </div>
          </div>

          {/* ROL Y GRUPO */}
          <div className="flex flex-col sm:w-[62%] ml-7 mt-5">
            <label className="text-[2.4vh] mb-4 ml-1 font-medium ml-5">
              Rol y Grupo
            </label>

            <div className="flex flex-col sm:flex-row gap-6 pr-12 sm:pr-0">
              <div className="flex flex-col flex-1">
                <div className="flex ml-6 gap-2">
                  <img src={rol} className="w-5 h-5" alt="" />
                  <label htmlFor="rol" className="text-sm text-gray-800 mb-1">
                    Rol
                  </label>
                </div>
                <select
                  id="rol"
                  value={formData.role || ""}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  disabled={isPending}
                  className="border border-gray-300 rounded-md px-3 py-[2vh] text-sm w-full sm:w-72 mt-1 ml-5
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150
                    disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <label htmlFor="grupo" className="text-sm text-gray-800 mb-2">
                    Grupo
                  </label>
                </div>
                <select
                  id="grupo"
                  value={formData.groupIdGroup ?? ""}
                  onChange={(e) => setFormData({ ...formData, groupIdGroup: Number(e.target.value) })}
                  disabled={loadingGroup || isPending}
                  className="border border-gray-300 rounded-md px-3 py-[2vh] text-sm w-full sm:w-72 ml-5
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 transition duration-150
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="" disabled>
                    {loadingGroup ? "Cargando grupos..." : "Selecciona un grupo"}
                  </option>
                  {memoizedGroups.length > 0 ? (
                    memoizedGroups.map((g) => (
                      <option key={g.idGroup} value={g.idGroup}>
                        {g.nameGroup}
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
                    onClick={resetForm}
                    disabled={isPending}
                    className="bg-gray-500 text-white py-3 px-4 rounded hover:bg-gray-600 transition cursor-pointer
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancelar
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isPending || loading}
                  className={`py-3 px-4 sm:px-16 whitespace-nowrap rounded transition cursor-pointer
                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${
                    isEditing 
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "bg-[#1677FF] hover:bg-[#1677ffcc] text-white"
                  }`}
                >
                  {isPending || loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Procesando...
                    </>
                  ) : (
                    isEditing ? "Editar personal" : "Agregar personal"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>

      <main className="pr-10 pl-10 pb-10 sm:pb-7">
        <label className="text-[2.4vh] ml-1 font-medium">Usuarios agregados</label>

        <div className={`overflow-x-auto mt-6 rounded-lg shadow-sm transition-opacity duration-200 ${
          isPending ? 'opacity-60' : 'opacity-100'
        }`}>
          <div className="sm:max-h-[60vh] sm:overflow-y-auto min-w-[800px] rounded-lg border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="sticky top-0 bg-gradient-to-r from-blue-50 to-gray-50 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    <div className="flex items-center">
                      <span>Nombre</span>
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Apellido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Grupo
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {memoizedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-gray-500 font-medium">No hay usuarios registrados</p>
                        <p className="text-gray-400 text-sm mt-1">Agrega tu primer usuario para comenzar</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  memoizedUsers.map((persona, index) => (
                    <tr 
                      key={persona.idUser || index} 
                      className={`hover:bg-blue-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {persona.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {persona.lastname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {persona.username}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          persona.role === 'Admin' 
                            ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                            : persona.role === 'Líder'
                              ? 'bg-amber-100 text-amber-900 border border-amber-200 font-bold'
                              : persona.role.toLowerCase() === 'enfermero'
                                ? 'bg-teal-100 text-teal-900 border border-teal-200'
                                : 'bg-green-100 text-green-800 border border-green-200'
                        }`}>
                          {persona.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {persona.groupName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(persona)}
                            disabled={isPending}
                            className="cursor-pointer inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <svg className="-ml-0.5 mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Editar
                          </button>
                          <button
                            onClick={() => deletedUser(persona.idUser)}
                            disabled={isPending || deleting}
                            className="cursor-pointer inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <svg className="-ml-0.5 mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            {deleting ? 'Eliminando...' : 'Eliminar'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Efecto de sombra para indicar scroll */}
          <div className="hidden sm:block h-4 bg-gradient-to-t from-gray-50 to-transparent -mt-4 relative z-20"></div>
        </div>
      </main>
    </>
  );
}

// Main Component with Suspense
function FormRegisterNurses() {
  return (
    <Suspense fallback={<FormLoadingSkeleton />}>
      <FormContent />
    </Suspense>
  );
}

export default FormRegisterNurses;