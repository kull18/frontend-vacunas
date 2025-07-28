import type { User, UserLogin } from "./User";
import type { Group } from "../../Group/Domain/Group";
import Swal from "sweetalert2";

export class UserRepository {
    private baseUrl = `${import.meta.env.VITE_URL_API_1}/api`;
    
    private async verifyToken(): Promise<string> {
        const token = localStorage.getItem("token");
        if (!token) {
            await Swal.fire({
                title: 'Sesión expirada',
                text: 'No hay sesión activa',
                icon: 'warning',
                confirmButtonText: 'Entendido'
            });
            window.location.href = "/login";
            throw new Error("NO_TOKEN");
        }
        return token;
    }

    private async handleResponse(response: Response): Promise<any> {
        if (response.status === 401) {
            localStorage.removeItem("token");
            await Swal.fire({
                title: 'Sesión expirada',
                text: 'Tu sesión ha caducado',
                icon: 'error',
                confirmButtonText: 'Entendido'
            });
            window.location.href = "/login";
            throw new Error("SESSION_EXPIRED");
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Error en la petición");
        }

        return response.json();
    }

    async getUser(): Promise<User[]> {
        const token = await this.verifyToken();
        try {
            const response = await fetch(`${this.baseUrl}/userMedicPersona`, {
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
        const token = await this.verifyToken();
        try {
            const headers = {
                "Authorization": `Bearer ${token}`
            };

            // Get users
            const usersResponse = await fetch(`${this.baseUrl}/leadersAndNurse`, { headers });
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
        const token = await this.verifyToken();
        try {
            const response = await fetch(`${this.baseUrl}/userMedicPersona`, {
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
                throw new Error(errorData.message || "Credenciales inválidas");
            }

            const authHeader = response.headers.get("authorization");
            if (!authHeader) throw new Error("No se encontró el token");

            const token = authHeader.split(" ")[1];
            const body = await response.json();
            return { token, body };

        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw error;
        }
    }

    async updateUser(id: number, updatedData: Partial<User>): Promise<User> {
        const token = await this.verifyToken();
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
        const token = await this.verifyToken();
        try {
            const response = await fetch(`${this.baseUrl}/userMedicPersona/${id}`, {
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
}