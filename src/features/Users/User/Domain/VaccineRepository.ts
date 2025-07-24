import type { AlcoholData } from "./DataAlcoholemia";

export interface Vaccine {
  idVaccines: number;
  nameVaccine: string;
}

export class VaccineRepository {
  private baseUrl = `${import.meta.env.VITE_URL_API}/vaccine`;

  private formatToken(token: string | null): string | null {
    if (!token) return null;
    const trimmed = token.trim().replace(/[^\x00-\x7F]/g, "");
    if (!trimmed.startsWith("Bearer ")) {
      return `Bearer ${trimmed}`;
    }
    return trimmed;
  }

  private getHeaders(token: string | null): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const formatted = this.formatToken(token);
    if (formatted) {
      headers["Authorization"] = formatted;
    }

    return headers;
  }

  async getVaccines(token: string | null): Promise<Vaccine[]> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "GET",
        headers: this.getHeaders(token),
      });

      if (response.status === 401) {
        throw new Error("No autorizado: Token inválido o faltante");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "No se pudieron obtener las vacunas");
      }

      const data = await response.json();
      return data.vaccines ?? data;
    } catch (error) {
      console.error("Error en getVaccines:", error);
      throw error;
    }
  }

  async getAlcoholemiaData(token: string | null): Promise<AlcoholData[]> {
    try {
      const response = await fetch(`http://localhost:8001/SensorCheck/alcoholemia`, {
        method: 'GET'
      })

      if(!response.ok) {
        throw new Error("error to get data alcoholemia")
      }

      const dataAlcoholemia = await response.json()

      return dataAlcoholemia
    }catch(error) {
      throw error
    }
  }

  async createVaccine(newVaccine: Vaccine, token: string | null): Promise<Vaccine> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: this.getHeaders(token),
        body: JSON.stringify(newVaccine),
      });

      if (response.status === 401) {
        throw new Error("No autorizado: Token inválido o expirado");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al crear la vacuna");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en createVaccine:", error);
      throw error;
    }
  }

  async updateVaccine(id: number, updatedData: Partial<Vaccine>, token: string | null): Promise<Vaccine> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: this.getHeaders(token),
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "No se pudo actualizar la vacuna");
      }

      const data = await response.json();
      return data.vaccine ?? data;
    } catch (error) {
      console.error("Error en updateVaccine:", error);
      throw error;
    }
  }

  async deleteVaccine(id: number, token: string | null): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
        headers: this.getHeaders(token),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "No se pudo eliminar la vacuna");
      }

      return true;
    } catch (error) {
      console.error("Error en deleteVaccine:", error);
      throw error;
    }
  }
}
