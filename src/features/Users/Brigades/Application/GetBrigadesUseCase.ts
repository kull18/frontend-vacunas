import type { Brigade } from "../Domain/Brigades";
import { BrigadesRepository } from "../Domain/BrigadesRepository";

export class GetBrigadeUseCase {
    private brigadesRepository: BrigadesRepository;

    constructor(brigadesRepository: BrigadesRepository) {
        this.brigadesRepository = brigadesRepository;
    }

    async execute(id: number): Promise<Brigade> {
        // Input validation
        if (!id || id <= 0) {
            throw new Error("ID de brigada inválido");
        }

        try {
            // Business logic can be added here if needed
            const brigade = await this.brigadesRepository.getBrigadeById(id);
            
            // Additional validation if needed
            if (!brigade) {
                throw new Error("Brigada no encontrada");
            }

            return {
  ...brigade,
  locations: brigade.locations.map(loc => loc.location) // convierte BrigadeLocation a string
};

        } catch (error) {
            // Enhance and rethrow the error with context
            const errorMessage = error instanceof Error 
                ? error.message 
                : "Error desconocido al obtener la brigada";
            
            console.error(`[GetBrigadeUseCase] Error al obtener brigada ID ${id}:`, error);
            throw new Error(`No se pudo obtener la brigada: ${errorMessage}`);
        }
    }
}