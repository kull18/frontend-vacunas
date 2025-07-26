import { BoxRepository } from "../Domain/BoxVaccineRepository";

interface DeleteBoxUseCaseDependencies {
    boxRepository: BoxRepository;
}

export class DeleteBoxUseCase {
    private boxRepository: BoxRepository;

    constructor({ boxRepository }: DeleteBoxUseCaseDependencies) {
        this.boxRepository = boxRepository;
    }

    async execute(id: number): Promise<boolean> {
        // Validaciones adicionales pueden ir aquí
        if (isNaN(id) || id <= 0) {
            throw new Error("El ID de la caja debe ser un número positivo");
        }

        return await this.boxRepository.deleteBox(id);
    }
}