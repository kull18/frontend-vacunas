import type { Vaccine } from "../Domain/Vaccine";
import { VaccineRepository } from "../Domain/VaccineRepository";

export class CreateVaccineUseCase {
    private vaccineRepository: VaccineRepository;

    constructor() {
        this.vaccineRepository = new VaccineRepository();
    }

    async execute(newVaccine: Vaccine): Promise<Vaccine> {
        try {
            const createdVaccine = await this.vaccineRepository.createVaccine(newVaccine);
            return createdVaccine;
        } catch (error) {
            console.error("Error al crear vacuna:", error);
            throw error;
        }
    }
}
