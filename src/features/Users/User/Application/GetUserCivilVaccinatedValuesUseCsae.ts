// GetUserCivilVaccinatedValuesUseCase.ts
import { UserCivilVaccinatedRepository } from "../Domain/UserCivilVaccinatedRepository";
import type { VaccinationResponse } from "../Domain/VaccinationResponse";

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

    async execute(forceRefresh: boolean = false): Promise<VaccinationResponse> {
        try {
            const now = Date.now();
            const cacheValid = GetUserCivilVaccinatedValuesUseCase.cache.data && 
                              (now - GetUserCivilVaccinatedValuesUseCase.cache.timestamp) < GetUserCivilVaccinatedValuesUseCase.cache.ttl;

            // Si no es refresh forzado y el cache es válido, devolver cache
            if (!forceRefresh && cacheValid) {
                return GetUserCivilVaccinatedValuesUseCase.cache.data!;
            }

            // Obtener datos frescos
            const data = await this.repository.getUserCivilVaccinatedValues();
            
            // Actualizar cache
            GetUserCivilVaccinatedValuesUseCase.cache = {
                data,
                timestamp: now,
                ttl: 30000
            };

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