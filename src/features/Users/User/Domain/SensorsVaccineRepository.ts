import type { GraficResponse } from "../../presentation/Components/Molecules/Gauss/GaussFormat";

export class SensorsVaccineRepository {
  private url = `${import.meta.env.VITE_URL_API_1}/api`;

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

  async getPointInGauss(token: string | null): Promise<GraficResponse> {
    

    const response = await fetch(`${this.url}/gaussCurve`, {
        headers: this.getHeaders(token )
    });
    
    if (!response.ok) {
      throw new Error("Error al obtener datos de la curva de Gauss");
    }

    const data: GraficResponse = await response.json();
    return data;
  }

  async createPointGauss(token: string | null, value: number): Promise<GraficResponse> {
    const response = await fetch(`${this.url}/pointInGauss`, {
      method: "POST",
      headers: this.getHeaders(token),
      body: JSON.stringify({ "value": value }),
    });

    if (!response.ok) {
      throw new Error("Error al crear punto en la curva de Gauss");
    }

    const data: GraficResponse = await response.json();
    return data;
  }
}
