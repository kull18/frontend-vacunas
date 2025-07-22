import { useEffect, useState } from "react";
import type { User, UserLogin } from "../../Domain/User";
import { LoginUserUseCase } from "../../Application/LoginUserUseCase";

interface AuthResponse {
    token: string;
    body: User;
}

interface PropsLoginUser {
  loginUser: (credentials: UserLogin) => Promise<AuthResponse>;
  loggedUser: UserLogin | null;
  loading: boolean;
  error: unknown | null;
  token: string | null;
}

export const useLoginUser = (): PropsLoginUser => {
  const [loggedUser, setLoggedUser] = useState<UserLogin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const loginUser = async (credentials: UserLogin): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);

    try {
      const uc = new LoginUserUseCase();
      const { token, body } = await uc.execute(credentials);

      console.log("Token:", token);
      console.log("Usuario desde Hook:", body);

      setLoggedUser(body);     // Actualiza el usuario logueado
      setToken(token);         // Guarda el token en estado
      return { token, body };
    } catch (err) {
      console.error("Error en Hook loginUser:", err);
      setError(err);
      throw err; // Ensure the function always throws if it fails
    } finally {
      setLoading(false);
    }
  };

  return {
    loginUser,
    loggedUser,
    loading,
    error,
    token
  };
};