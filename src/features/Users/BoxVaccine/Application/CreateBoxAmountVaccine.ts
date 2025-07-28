import type { BoxVaccineAmount } from "../Domain/BoxVaccine";
import { BoxRepository } from "../Domain/BoxVaccineRepository";

export class CreateBoxAmountUseCase {
    private boxRepository: BoxRepository;

    constructor() {
        this.boxRepository = new BoxRepository();
    }

    async execute(newBox: BoxVaccineAmount): Promise<BoxVaccineAmount> {
        try {
            const createdBox = await this.boxRepository.createAmountVaccineBox(newBox);
            return createdBox;
        } catch (error) {
            console.error("Error al crear usuario, app:", error);
            throw error;
        }
    }
}