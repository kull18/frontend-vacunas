import type { SensorCheckDataValues } from "./SensorCheckDataValues";
import type { Statistics } from "./Statics";

export class SensorCheckRepostory {
    private baseUrl = `${import.meta.env.VITE_URL_API_2}/SensorCheck`;
    private baseUrl2 = `${import.meta.env.VITE_URL_API_1}/api/gaussCurve`;


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


    async getSensorCheckData(): Promise<SensorCheckDataValues> {
        try {
            const response = await fetch(`${this.baseUrl}/temperature`);

            if (!response.ok) {
                throw new Error("Error al obtener datos del sensor");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    async getStatistics(): Promise<Statistics> {
        try {
            const response = await fetch(this.baseUrl2, {

                method: 'GET',
                headers: this.getHeaders(localStorage.getItem("token"))
            }
            );

            if (!response.ok) {
                throw new Error("Error al obtener datos estadísticos");
            }

            const data: Statistics = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
}
