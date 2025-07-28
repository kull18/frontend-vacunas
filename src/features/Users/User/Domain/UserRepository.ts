import { data } from "react-router-dom";
import type { User, UserLogin } from "./User";
import type { Group } from "../../Group/Domain/Group";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export class UserRepository {
    private async verifyToken(): Promise<string> {
        const token = localStorage.getItem("token");
        if (!token) {
            await Swal.fire({
                title: 'Sesión expirada',
                text: 'No hay sesión activa',
                icon: 'warning',
                confirmButtonText: 'Entendido'
            });
            window.location.href = "/login"; // Redirige al login
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
            window.location.href = "/login"; // Redirige al login
            throw new Error("SESSION_EXPIRED");
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Error en la petición");
        }

        return response.json();
    }

    async getUser(): Promise<User[]> {
        const token = await this.verifyToken(); // Verifica el token primero
        try {
            const response = await fetch("http://127.0.0.1:8000/api/userMedicPersona", {
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
        const token = await this.verifyToken(); // Verifica el token primero
        try {
            const headers = {
                "Authorization": `Bearer ${token}`
            };

            // Obtener usuarios
            const usersResponse = await fetch("http://127.0.0.1:8000/api/leadersAndNurse", { headers });
            const users: User[] = await this.handleResponse(usersResponse);

            // Obtener grupos
            const groupsResponse = await fetch("http://127.0.0.1:8000/api/groups", { headers });
            const groups: Group[] = await this.handleResponse(groupsResponse);

            // Asociar usuarios con sus grupos
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
        const token = await this.verifyToken(); // Verifica el token primero
        try {
            const response = await fetch("http://127.0.0.1:8000/api/userMedicPersona", {
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
            const response = await fetch("http://127.0.0.1:8000/api/login/userMedicPersona", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) throw new Error("Credenciales inválidas");

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
        const token = await this.verifyToken(); // Verifica el token primero
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/userMedicPersona/${id}`, {
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
        const token = await this.verifyToken(); // Verifica el token primero
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/userMedicPersona/${id}`, {
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