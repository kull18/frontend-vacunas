import type { BoxVaccine } from "../Domain/BoxVaccine";
import { BoxRepository } from "../Domain/BoxVaccineRepository";

export class CreateBoxUseCase {
    private boxRepository: BoxRepository;

    constructor(boxRepository?: BoxRepository) {
        this.boxRepository = boxRepository ?? new BoxRepository();
    }

    async execute(newBox: BoxVaccine): Promise<BoxVaccine> {
        // Validación básica
        if (!newBox.idVaccineBox || newBox.idVaccineBox <= 0) {
            throw new Error("ID de caja inválido");
        }

        try {
            return await this.boxRepository.createBox({
                idVaccineBox: newBox.idVaccineBox,
                amountVaccines: newBox.amountVaccines || 0,
                idVaccines: newBox.idVaccines || []
            });
        } catch (error) {
            console.error("Error en CreateBoxUseCase:", error);
            throw new Error(`No se pudo crear la caja: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
    }
}