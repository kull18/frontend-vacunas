import { useEffect, useState } from "react";
import type { User } from "../../Domain/User";
import { GetUserUseCase } from "../../Application/GetUserUseCase"; // asegúrate de tener este caso de uso

interface PropsGetUserRol {
  usersRol: User[];
  loadingRol: boolean;
  errorRol: unknown | null;
}

export const useGetUserRole = (): PropsGetUserRol => {
  const [usersRol, setUsersRol] = useState<User[]>([]);
  const [loadingRol, setLoadingRol] = useState(false);
  const [errorRol, setErrorRol] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingRol(true);
      try {
        const uc = new GetUserUseCase();
        const users = await uc.execute();
        console.log("Usuarios con roles:", users);
        // Filtrar solo roles "enfermero" y "lider"
        const filtered = users.filter((user) =>
          ["enfermero", "lider"].includes(user.role?.toLowerCase())
        );

        setUsersRol(filtered);
      } catch (error) {
        setErrorRol(error);
      } finally {
        setLoadingRol(false);
      }
    };

    fetchUsers();
  }, []);

  return {
    usersRol,
    loadingRol,
    errorRol,
  };
};
