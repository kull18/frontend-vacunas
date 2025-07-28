import { useEffect, useState } from "react";
import type { User, UserLogin } from "../../Domain/User";
import { LoginUserUseCase } from "../../Application/LoginUserUseCase";

interface AuthResponse {
  token: string;
  body: User;
}

interface PropsLoginUser {
  loginUser: (credentials: UserLogin) => Promise<AuthResponse>;
  loggedUser: User | null;
  loading: boolean;
  error: unknown | null;
  token: string | null;
}

export const useLoginUser = (): PropsLoginUser => {
  const [loggedUser, setLoggedUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("loggedUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

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

      setLoggedUser(body);
      setToken(token);

      localStorage.setItem("loggedUser", JSON.stringify(body));
      localStorage.setItem("token", token);

      return { token, body };
    } catch (err) {
      console.error("Error en Hook loginUser:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Opcional: efecto para sincronizar cambios del estado con localStorage (por si se actualiza por otro lado)
  useEffect(() => {
    if (loggedUser) {
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    } else {
      localStorage.removeItem("loggedUser");
    }
  }, [loggedUser]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return {
    loginUser,
    loggedUser,
    loading,
    error,
    token,
  };
};
