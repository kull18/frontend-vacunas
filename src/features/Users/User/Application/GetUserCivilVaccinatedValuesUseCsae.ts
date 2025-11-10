// GetUserCivilVaccinatedValuesUseCase.ts
import { UserCivilVaccinatedRepository } from "../Domain/UserCivilVaccinatedRepository";
import type { VaccinationNameCountGraph, VaccinationResponse } from "../Domain/VaccinationResponse";

export class GetUserCivilVaccinatedValuesUseCase {
    private repository: UserCivilVaccinatedRepository;
    private static cache: {
        data: VaccinationResponse | null;
        timestamp: number;
        ttl: number; // Time to live in milliseconds
    } = {
        data: null,
        timestamp: 0,
        ttl: 30000 // 30 segundos
    };

    constructor() {
        this.repository = new UserCivilVaccinatedRepository();
    }

    async execute(): Promise<VaccinationNameCountGraph> {
        try {

            const data = await this.repository.getUserCivilVaccinatedValues();
            
            return data;
        } catch (error) {
            console.error('Error in GetUserCivilVaccinatedValuesUseCase:', error);
            throw error;
        }
    }

    // Método para invalidar cache manualmente
    static invalidateCache(): void {
        GetUserCivilVaccinatedValuesUseCase.cache = {
            data: null,
            timestamp: 0,
            ttl: 30000
        };
    }
}