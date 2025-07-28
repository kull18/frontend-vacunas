// src/Presentation/Hooks/useGetUserRole.ts
import { useEffect, useState } from "react";
import type { User } from "../../Domain/User";
import { GetUserRoleCase } from "../../Application/GetUserByRolUseCase";

interface UserRoleHookResult {
  users: User[];
  loadingRole: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// src/Presentation/Hooks/useGetUserRole.ts
export const useGetUserRole = (): UserRoleHookResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingRole, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    console.log("[useGetUserRole] Iniciando obtención de usuarios...");
    try {
      setLoading(true);
      setError(null);
      const uc = new GetUserRoleCase();
      const usersData = await uc.execute();
      console.log("[useGetUserRole] Datos recibidos:", usersData);
      setUsers(usersData);
    } catch (err) {
      console.error("[useGetUserRole] Error al obtener usuarios:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      console.log("[useGetUserRole] Finalizada obtención de usuarios");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("[useGetUserRole] Efecto montado, obteniendo usuarios...");
    fetchUsers();
  }, []);

  return { 
    users, 
    loadingRole, 
    error, 
    refetch: () => {
      console.log("[useGetUserRole] Refetch manual solicitado");
      return fetchUsers();
    } 
  };
};