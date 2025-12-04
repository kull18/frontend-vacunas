import type { BoxVaccine } from "../Domain/BoxVaccine";
import { BoxRepository } from "../Domain/BoxVaccineRepository";

export class UpdateBoxUseCase {
    private boxRepository: BoxRepository;

    constructor(boxRepository?: BoxRepository) {
        this.boxRepository = boxRepository ?? new BoxRepository();
    }

    async execute(id: number, updatedBox: Partial<BoxVaccine>): Promise<BoxVaccine> {
        // Validaciones
        if (!id || id <= 0) {
            throw new Error("ID de caja inválido");
        }

        if (updatedBox.amountVaccines !== undefined && updatedBox.amountVaccines < 0) {
            throw new Error("La cantidad de vacunas no puede ser negativa");
        }

        try {
            return await this.boxRepository.updateBox(id, updatedBox);
        } catch (error) {
            console.error("Error en UpdateBoxUseCase:", error);
            throw new Error(
                `No se pudo actualizar la caja: ${
                    error instanceof Error ? error.message : 'Error desconocido'
                }`
            );
        }
    }
}