import type { User, UserLogin, UserCivil } from "./User";
import type { Group } from "../../Group/Domain/Group";
import Swal from "sweetalert2";


interface AuthResponse {
  token: string;
  body: User;
}

interface LoginError {
  type: 'invalid_credentials' | 'network_error' | 'server_error' | 'unknown'; // ← Actualizado
  message: string;
  response?: {
    status: number;
    data: any;
  };
}

export class UserRepository {
    private baseUrl = `${import.meta.env.VITE_URL_API_1}/api`;
    
    private getToken(): string {
        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire({
                title: 'Sesión no encontrada',
                text: 'No hay sesión activa',
                icon: 'warning',
                confirmButtonText: 'Entendido'
            });
            window.location.href = "/";
            throw new Error("NO_TOKEN");
        }
        return token;
    }

    private async handleResponse(response: Response): Promise<any> {
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Error en la petición");
        }
        return response.json();
    }

    async getUser(): Promise<User[]> {
        const token = this.getToken();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/userMedicPersona`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            return this.handleResponse(response);
        } catch (error) {
            console.error("Error fetch users", error);
            throw error;
        }
    }

    async getUserByRol(): Promise<User[]> {
        const token = this.getToken();
        try {
            const headers = {
                "Authorization": `Bearer ${token}`
            };

            // Get users
            const usersResponse = await fetch("http://127.0.0.1:8000/api/leadersAndNurse", { headers });
            const users: User[] = await this.handleResponse(usersResponse);

            // Get groups
            const groupsResponse = await fetch(`${this.baseUrl}/groups`, { headers });
            const groups: Group[] = await this.handleResponse(groupsResponse);

            // Associate users with their groups
            return users.map(user => ({
                ...user,
                groupName: groups.find(g => g.idGroup === user.groupIdGroup)?.nameGroup || 'Sin grupo'
            }));

        } catch (error) {
            console.error("[UserRepository] Error:", error);
            throw error;
        }
    }

    async createUser(newUser: User): Promise<User> {
        const token = this.getToken();
        try {
            const response = await fetch(`${this.baseUrl}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newUser)
            });
            return this.handleResponse(response);
        } catch (error) {
            console.error("Error al crear usuario:", error);
            throw error;
        }
    }

    async loginUser(credentials: { username: string; password: string }): Promise<{ token: string; body: User }> {
        try {
            const response = await fetch(`${this.baseUrl}/login/userMedicPersona`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const detail = errorData.detail;

        console.log("❌ Error del backend:", detail);
        console.log("📊 Status HTTP:", response.status);

        // Caso 1: Error estructurado con type y message
        if (typeof detail === 'object' && detail.type && detail.message) {
          throw {
            type: detail.type,
            message: detail.message,
            response: { status: response.status, data: errorData }
          } as LoginError;
        }

        // Caso 2: Error como string simple
        if (typeof detail === 'string') {
          // Credenciales inválidas (401 o 404)
          if (response.status === 401 || response.status === 404 || 
              detail.toLowerCase().includes('credenciales') ||
              detail.toLowerCase().includes('usuario') ||
              detail.toLowerCase().includes('contraseña')) {
            throw {
              type: 'invalid_credentials',
              message: 'Credenciales inválidas',
              response: { status: response.status, data: errorData }
            } as LoginError;
          }
        }

        // Error de servidor
        if (response.status === 500) {
          throw {
            type: 'server_error',
            message: 'Error del servidor. Intenta más tarde.',
            response: { status: response.status, data: errorData }
          } as LoginError;
        }

        // Error genérico HTTP
        throw {
          type: 'unknown',
          message: 'Error al iniciar sesión',
          response: { status: response.status, data: errorData }
        } as LoginError;
      }

      // Login exitoso
      const authHeader = response.headers.get("authorization");
      if (!authHeader) {
        throw {
          type: 'unknown',
          message: 'No se encontró el token de autenticación'
        } as LoginError;
      }

      const token = authHeader.replace("Bearer ", "");
      const body = await response.json();

      console.log("✅ Login exitoso en Repository");
      console.log("🔑 Token:", token);
      console.log("👤 User:", body);

      return { token, body };

    } catch (error: any) {
      if (error.type) {
        console.error("❌ Error en LoginUserRepository:", error);
        throw error;
      }

      console.error("❌ Error de red en Repository:", error);
      throw {
        type: 'network_error',
        message: 'Error de conexión. Verifica tu internet.'
      } as LoginError;
    }
  }

    async updateUser(id: number, updatedData: Partial<User>): Promise<User> {
        const token = this.getToken();
        try {
            const response = await fetch(`${this.baseUrl}/userMedicPersona/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });
            return this.handleResponse(response);
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            throw error;
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        const token = this.getToken();
        try {
            const response = await fetch(`${this.baseUrl}/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            await this.handleResponse(response);
            return true;
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            throw error;
        }
    }

      /**
   * Obtiene usuarios civiles sin cuenta asociada
   */
  async getCivilUsersWithoutAccount(): Promise<UserCivil[]> {
    const token = this.getToken();
    try {
      const response = await fetch(`${this.baseUrl}/users-civil/without-account`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error("Error fetching civil users without account:", error);
      throw error;
    }
  }

  /**
   * Obtiene todas las cuentas de usuario activas
   */
  async getUserAccounts(): Promise<User[]> {
    const token = this.getToken();
    try {
      const response = await fetch(`${this.baseUrl}/user-accounts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error("Error fetching user accounts:", error);
      throw error;
    }
  }
}