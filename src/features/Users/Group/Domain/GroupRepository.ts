import type { Group } from "./Group";
import Swal from "sweetalert2";

export class GroupRepository {
    private baseurl: string = `${import.meta.env.VITE_URL_API_1}/api/groups`;
    
    private async verifyToken(): Promise<string> {
        const token = localStorage.getItem("token");
        if (!token) {
            await Swal.fire({
                title: 'Sesión expirada',
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
        if (response.status === 401) {
            localStorage.removeItem("token");
            await Swal.fire({
                title: 'Sesión expirada',
                text: 'Tu sesión ha caducado',
                icon: 'error',
                confirmButtonText: 'Entendido'
            });
            window.location.href = "/";
            throw new Error("SESSION_EXPIRED");
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Error HTTP! estado: ${response.status}`);
        }

        return response.json();
    }

    async getGroup(): Promise<Group[]> {
        try {
            const token = await this.verifyToken();
            const response = await fetch(this.baseurl, {
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                }
            });
            return this.handleResponse(response);
        } catch (error) {
            console.error("Error al obtener grupos:", error);
            throw error;
        }
    }

    async createGroup(newGroup: Omit<Group, 'idGroup'>): Promise<Group> {
        try {
            const token = await this.verifyToken();
            const response = await fetch(this.baseurl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newGroup)
            });
            return this.handleResponse(response);
        } catch (error) {
            console.error("Error al crear grupo:", error);
            throw error;
        }
    }

    async deleteGroup(id: number): Promise<boolean> {
        try {
            const token = await this.verifyToken();
            const response = await fetch(`${this.baseurl}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error HTTP! estado: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error(`Error al eliminar grupo (ID: ${id}):`, error);
            throw error;
        }
    }

    // ✅ MÉTODO UPDATE (ya existía, optimizado)
    async updateGroup(id: number, updatedGroup: Partial<Group>): Promise<Group> {
        try {
            const token = await this.verifyToken();
            const response = await fetch(`${this.baseurl}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedGroup)
            });
            return this.handleResponse(response);
        } catch (error) {
            console.error(`Error al actualizar grupo (ID: ${id}):`, error);
            throw error;
        }
    }
}