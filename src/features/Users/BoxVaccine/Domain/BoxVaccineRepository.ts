import type { BoxVaccine, BoxVaccineAmount } from "../Domain/BoxVaccine";
import Swal from "sweetalert2";

export class BoxRepository {

    private readonly baseUrl: string = `${import.meta.env.VITE_URL_API_1}/api/vaccineBox`;

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
                text: 'Tu sesión ha caducado. Serás redirigido al login',
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

    async getBoxs(): Promise<BoxVaccine[]> {
        try {
            const token = await this.verifyToken();
            const response = await fetch(this.baseUrl, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return this.handleResponse(response);
        } catch (error) {
            console.error("Error al obtener cajas:", error);
            throw error;
        }
    }

async createBox(newBox: BoxVaccine): Promise<BoxVaccine> {
    try {
        const token = await this.verifyToken();
        const response = await fetch(this.baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                amountVaccines: newBox.amountVaccines || 0,
                idVaccineBox: newBox.idVaccineBox
            })
        });
        return this.handleResponse(response);
    } catch (error) {
        console.error("Error al crear caja:", error);
        throw error;
    }
}


    async createAmountVaccineBox(newBox: BoxVaccineAmount): Promise<BoxVaccineAmount> {
        try {
            const token = await this.verifyToken();
            const response = await fetch(this.baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    amountVaccines: newBox.amountVaccines
                })
            });
            return this.handleResponse(response);
        } catch (error) {
            console.error("Error al crear cantidad de vacunas:", error);
            throw error;
        }
    }
async deleteBox(id: number): Promise<boolean> {
    try {
        const token = await this.verifyToken();
        const response = await fetch(`${this.baseUrl}/${id}`, {
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
        console.error(`Error al eliminar caja (ID: ${id}):`, error);
        throw error;
    }
}
}