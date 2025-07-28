import { BoxRepository } from "../Domain/BoxVaccineRepository";

interface DeleteBoxUseCaseDependencies {
    boxRepository: BoxRepository;
}

export class DeleteBoxUseCase {
    private readonly boxRepository: BoxRepository;

    constructor(boxRepository: BoxRepository) {
        this.boxRepository = boxRepository;
    }

    async execute(id: number): Promise<boolean> {
        if (isNaN(id) || id <= 0) {
            throw new Error("El ID de la caja debe ser un número positivo");
        }

        try {
            return await this.boxRepository.deleteBox(id);
        } catch (error) {
            console.error(`Error en DeleteBoxUseCase (ID: ${id}):`, error);
            throw new Error(`No se pudo eliminar la caja: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
    }
}