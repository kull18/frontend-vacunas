import type { AlcoholData } from "./DataAlcoholemia";
import type { VaccineVaccineBox } from "./VaccineVaccineBox";
import type { VaccineName } from "./Vaccine";

export interface Vaccine {
  idVaccines: number;
  nameVaccine: string;
}

export class VaccineRepository {
  private baseUrl = `${import.meta.env.VITE_URL_API_1}/api/vaccine`;
  private secondUrl = "https://apivacunation.ddns.net/SensorCheck/alcoholemia";

  private getAuthHeaders(token: string): HeadersInit {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.trim()}`
    };
  }

  async getVaccines(token: string): Promise<Vaccine[]> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "GET",
        headers: this.getAuthHeaders(token)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "No se pudieron obtener las vacunas");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en getVaccines:", error);
      throw error;
    }
  }

  async getAlcoholemiaData(): Promise<AlcoholData[]> {
    try {
      const response = await fetch(this.secondUrl, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Error al obtener datos de alcoholemia");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en getAlcoholemiaData:", error);
      throw error;
    }
  }

  async getVaccineAmount(token: string): Promise<VaccineVaccineBox[]> {
    try {
      const response = await fetch(`${this.baseUrl}s/vaccineBox`, {
        method: "GET",
        headers: this.getAuthHeaders(token)
      });

      if (!response.ok) {
        throw new Error("Error al obtener datos de vacunas en cajas");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en getVaccineAmount:", error);
      throw error;
    }
  }

  async createVaccine(newVaccine: { nameVaccine: string }, token: string): Promise<VaccineName> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: this.getAuthHeaders(token),
        body: JSON.stringify({ nameVaccine: newVaccine.nameVaccine }),
      });

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

  async updateVaccine(id: number, updatedData: Partial<Vaccine>, token: string): Promise<Vaccine> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: this.getAuthHeaders(token),
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

  async deleteVaccine(id: number, token: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
        headers: this.getAuthHeaders(token),
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