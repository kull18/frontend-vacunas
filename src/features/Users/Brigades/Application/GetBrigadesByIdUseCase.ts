import type { Brigade, BrigadeById } from "../Domain/Brigades";
import { BrigadesRepository } from "../Domain/BrigadesRepository";

export class GetBrigadeByIdUseCase {
    private brigadesRepository: BrigadesRepository;

    constructor(brigadesRepository: BrigadesRepository) {
        this.brigadesRepository = brigadesRepository;
    }

    async execute(idBrigade: number): Promise<BrigadeById | null> {
        try {
            // Validación básica del ID
            if (!idBrigade || idBrigade <= 0) {
                throw new Error("ID de brigada inválido");
            }

            // Obtener la brigada del repositorio
            const brigade = await this.brigadesRepository.getBrigadeById(idBrigade);

            if (!brigade) {
                console.warn(`No se encontró brigada con ID: ${idBrigade}`);
                return null;
            }

            return brigade;
        } catch (error) {
            console.error("Error en GetBrigadeByIdUseCase:", error);
            throw new Error("No se pudo obtener la brigada");
        }
    }
}