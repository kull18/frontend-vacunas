import type { Vaccine, VaccineName } from "./Vaccine";

export class VaccineRepository {
  private readonly baseUrl: string = "http://127.0.0.1:8000/api/vaccine";
  private token: string | null;

  constructor(token: string | null) {
    this.token = token;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

// src/Domain/VaccineRepository.ts
async getVaccines(): Promise<Vaccine[]> {
  try {
    console.log("Sending request to:", this.baseUrl);
    console.log("Using headers:", this.getHeaders());
    
    const response = await fetch(this.baseUrl, {
      headers: this.getHeaders(),
      credentials: 'include' // Si usas cookies
    });

    console.log("Response status:", response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Error details:", errorData);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Received data:", data);
    return data;
  } catch (error) {
    console.error("Full error details:", error);
    throw new Error(`Failed to fetch vaccines: ${error instanceof Error ? error.message : String(error)}`);
  }
}

  async createVaccine(newVaccine: VaccineName): Promise<Vaccine> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(newVaccine),
      });

      if (response.status === 403) {
        throw new Error("Forbidden: Check permissions or token validity");
      }

      if (!response.ok) {
        const errorData = await response.json();
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

      return await response.json();
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