import type { Brigade, BrigadeById } from "./Brigades";
import Swal from "sweetalert2";

export class BrigadesRepository {

    private readonly baseUrl: string = `${import.meta.env.VITE_URL_API_1}/api/brigades`;


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
                text: 'Tu sesión ha caducado. Serás redirigido al login',
                icon: 'error',
                confirmButtonText: 'Entendido'
            });
            window.location.href = "/login";
            throw new Error("SESSION_EXPIRED");
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Error HTTP! estado: ${response.status}`);
        }

        return response.json();
    }

    async getAllBrigades(): Promise<Brigade[]> {
        const token = await this.verifyToken();
        const response = await fetch(this.baseUrl, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return this.handleResponse(response);
    }

    async createBrigades(brigade: Omit<Brigade, 'id'>): Promise<Brigade> {
        const token = await this.verifyToken();
        const response = await fetch(this.baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(brigade)
        });
        return this.handleResponse(response);
    }

    async updateBrigades(id: number, brigade: Partial<Brigade>): Promise<Brigade> {
        const token = await this.verifyToken();
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(brigade)
        });
        return this.handleResponse(response);
    }

    async deleteBrigades(id: number): Promise<void> {
        const token = await this.verifyToken();
        const response = await fetch(`http://127.0.0.1:8000/api/brigade/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        await this.handleResponse(response);
    }

    async getBrigadeById(id: number): Promise<BrigadeById> {
        const token = await this.verifyToken();
        const response = await fetch(`${this.baseUrl}/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        
        const brigadeDataArray = await this.handleResponse(response);
        
        if (!brigadeDataArray || brigadeDataArray.length === 0) {
            throw new Error("No se encontraron datos de brigada");
        }
    
        return {
            idBrigade: brigadeDataArray[0].idBrigade,
            referenceBrigade: brigadeDataArray[0].referenceBrigade,
            startDate: brigadeDataArray[0].startDate,
            endDate: brigadeDataArray[0].endDate,
            locations: brigadeDataArray.map((item: any) => ({
                idLocation: item.idLocation,
                location: item.location
            }))
        };
    }

    async deleteLocationById(idLocation: number): Promise<Brigade> {
        const token = await this.verifyToken();
        const response = await fetch(`http://127.0.0.1:8000/api/brigate/locationY/${idLocation}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        
        const brigadeDataArray = await this.handleResponse(response);
        
        if (!brigadeDataArray || brigadeDataArray.length === 0) {
            throw new Error("No se encontraron datos de brigada");
        }
    
        return {
            idBrigade: brigadeDataArray[0].idBrigade,
            referenceBrigade: brigadeDataArray[0].referenceBrigade,
            startDate: brigadeDataArray[0].startDate,
            endDate: brigadeDataArray[0].endDate,
            locations: brigadeDataArray.map((item: any) => ({
                idLocation: item.idLocation,
                location: item.location
            }))
        };
    }
}