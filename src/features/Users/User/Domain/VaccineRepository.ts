import { AuthProvider, useAuth } from "../Presentation/Hooks/AuthProvider";

export interface Vaccine {
  idVaccines: number;
  nameVaccine: string;
}

export class VaccineRepository {
  private baseUrl = "http://127.0.0.1:8000/api/vaccine";
  private token: string | null;

  constructor() {
    // Obtener el token del contexto de autenticación (useAuth)
    // Esto requiere que el repositorio sea instanciado dentro de un componente React
    const { token } = useAuth();
    this.token = token;
  }


  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    
    console.log("headers", headers)
    return headers;
  }

  async getVaccines(): Promise<Vaccine[]> {
    try {
      const response = await fetch(this.baseUrl, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error("No se pudieron obtener las vacunas");
      }

      const data = await response.json();
      return data.vaccines ?? data;
    } catch (error) {
      console.error("Error al obtener vacunas:", error);
      throw error;
    }
  }

async createVaccine(newVaccine: Vaccine): Promise<Vaccine> {
    try {
      const headers = this.getHeaders();
      console.log("Headers:", headers); // Verifica que el token esté incluido

      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(newVaccine),
      });

      console.log("response", response)

      if (response.status === 403) {
        throw new Error("Forbidden: Check permissions or token validity");
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.message || "Failed to create vaccine");
      }

      return await response.json();
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  }
  async updateVaccine(id: number, updatedData: Partial<Vaccine>): Promise<Vaccine> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error("No se pudo actualizar la vacuna");
      }

      const data = await response.json();
      return data.vaccine ?? data;
    } catch (error) {
      console.error("Error al actualizar vacuna:", error);
      throw error;
    }
  }

  async deleteVaccine(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar la vacuna");
      }

      return true;
    } catch (error) {
      console.error("Error al eliminar vacuna:", error);
      throw error;
    }
  }
}