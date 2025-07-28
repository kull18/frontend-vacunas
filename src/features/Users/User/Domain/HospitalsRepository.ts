import type { Hospital } from "./Hospital";

const API_URL = `${import.meta.env.VITE_URL_API_1}/api/Hospital`;

export class HospitalRepository {

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

  async getAll(token: string | null): Promise<Hospital[]> {
    const response = await fetch(`${API_URL}`, {
      headers: this.getHeaders(token)
    });
    if (!response.ok) {
      throw new Error("Error al obtener los hospitales");
    }
    return await response.json();
  }
}
