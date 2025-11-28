import type { UserCivilVaccinated } from "./UserCivilVaccinated";
import type { VaccinationNameCountGraph, VaccinationResponse } from "./VaccinationResponse";

export interface PatientVaccinesResponse {
    patient: {
        id: number;
        name: string;
        firstLastname: string;
        secondLastname: string;
        fullName: string;
        CURP: string;
        isVaccinated: number;
    };
    vaccinations: Array<{
        vaccinationId: {
            patientId: number;
            medicId: number;
            vaccineId: number;
        };
        date: string;
        vaccine: {
            id: number;
            name: string;
        };
        medic: {
            id: number;
            name: string;
            firstLastname: string;
            fullName: string;
        };
    }>;
    vaccineCounts: Array<{
        vaccineName: string;
        dosesApplied: number;
    }>;
    totalVaccinations: number;
    summary: {
        hasVaccinations: boolean;
        uniqueVaccines: number;
        lastVaccinationDate: string | null;
    };
}

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

            const data = await response.json();
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

    async getPatientVaccines(patientId: number): Promise<PatientVaccinesResponse> {
        try {
            const url = `${this.baseUrl}/patient/${patientId}/vaccines`;
            console.log('🔍 Fetching patient vaccines from:', url);

            const response = await fetch(url);

            console.log('📡 Response status:', response.status);
            console.log('📡 Response ok:', response.ok);

            if (!response.ok) {
                // Intentar obtener el error del servidor
                let errorMessage = `HTTP ${response.status}`;
                
                try {
                    const errorData = await response.json();
                    console.error('❌ Error data from server:', errorData);
                    errorMessage = errorData.detail || errorData.message || errorMessage;
                } catch (parseError) {
                    console.error('❌ Could not parse error response:', parseError);
                    const textError = await response.text();
                    console.error('❌ Response text:', textError);
                }
                
                throw new Error(`Failed to fetch vaccines for patient ${patientId}: ${errorMessage}`);
            }

            const data = await response.json();
            console.log('✅ Patient vaccines data received:', data);
            
            return data;
        } catch (error) {
            console.error(`❌ Error in getPatientVaccines for patient ${patientId}:`, error);
            
            // Re-lanzar con más contexto
            if (error instanceof Error) {
                throw new Error(`Failed to fetch vaccines for patient ${patientId}: ${error.message}`);
            }
            
            throw new Error(`Failed to fetch vaccines for patient ${patientId}`);
        }
    }
}