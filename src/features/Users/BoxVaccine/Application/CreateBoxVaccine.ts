import type { BoxVaccine } from "../Domain/BoxVaccine";
import { BoxRepository } from "../Domain/BoxVaccineRepository";

export class CreateBoxUseCase {
    private boxRepository: BoxRepository;

    constructor() {
        this.boxRepository = new BoxRepository();
    }

    async execute(newBox: BoxVaccine): Promise<BoxVaccine> {
        try {
            const createdBox = await this.boxRepository.createBox(newBox);
            return createdBox;
        } catch (error) {
            console.error("Error al crear usuario, app:", error);
            throw error;
        }
    }
}