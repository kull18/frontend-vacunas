import type { SensorCheckDataValues } from "./SensorCheckDataValues";
import type { Statistics } from "./Statics";

export class SensorCheckRepostory {
    private baseUrl = `${import.meta.env.VITE_URL_API_2}/SensorCheck`;
    private baseUrl2 = `${import.meta.env.VITE_URL_API_1}/gaussCurve`;

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
            const response = await fetch(this.baseUrl2);

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
