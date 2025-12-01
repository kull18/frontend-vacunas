import type { Group } from "./Group";
import Swal from "sweetalert2";

export class GroupRepository {
    private baseurl: string = `${import.meta.env.VITE_URL_API_1}/api/groups`
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
            throw new Error(errorData.message || "Error en la petición");
        }

        return response.json();
    }

    async getGroup(): Promise<Group[]> {
        const token = await this.verifyToken();
        const response = await fetch("https://api.vacunas.brigadasvacunacion.com.mx/api/groups", {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        });
        return this.handleResponse(response);
    }

    async createGroup(newGroup: Omit<Group, 'id'>): Promise<Group> {
        const token = await this.verifyToken();
        const response = await fetch("https://api.vacunas.brigadasvacunacion.com.mx/api/groups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newGroup)
        });
        return this.handleResponse(response);
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
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error("Error deleting group:", error);
        throw error;
    }
}

    async updateGroup(id: number, updatedGroup: Partial<Group>): Promise<Group> {
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
    }
}