import type { UserCivilVaccinated } from "./UserCivilVaccinated";
import type { UserCivilVaccinatedData } from "./UserCivilVaccinatedData";
import type { VaccinationNameCountGraph, VaccinationResponse } from "./VaccinationResponse";

export class UserCivilVaccinatedRepository {
    private baseUrl = `${import.meta.env.VITE_URL_API_2}/UserCivilVaccinated`;

    async createUserCivilVaccinated(data: UserCivilVaccinated): Promise<UserCivilVaccinated> {
        try {
            const response = await fetch(`${this.baseUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Error al registrar vacunación');
            }

            return await response.json();
        } catch (error) {
            console.error('Error in createUserCivilVaccinated:', error);
            throw error;
        }
    }

    async getUserCivilVaccinatedValues(): Promise<VaccinationNameCountGraph> {
        try {
            const response = await fetch(`${this.baseUrl}/with-values`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to fetch vaccination data');
            }

            const data  = await response.json();

            return data.vaccineCounts; 
        } catch (error) {
            console.error('Error in getUserCivilVaccinatedValues:', error);
            throw error;
        }
    }

    async getUserCivilVaccinatedWithValuesId(id: number): Promise<VaccinationResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/with-values/${id}`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Failed to fetch data for ID ${id}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error in getUserCivilVaccinatedWithValuesId for ID ${id}:`, error);
            throw new Error(`Failed to fetch data for ID ${id}`);
        }
    }
}