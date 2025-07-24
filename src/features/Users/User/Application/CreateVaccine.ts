import type { VaccineName } from "../Domain/Vaccine";
import { VaccineRepository } from "../Domain/VaccineRepository";

export class CreateVaccineUseCase {
  private readonly vaccineRepository: VaccineRepository;

  constructor(token: string | null) {
    this.vaccineRepository = new VaccineRepository(token);
  }

  async execute(newVaccine: VaccineName): Promise<VaccineName> {
    try {
      return await this.vaccineRepository.createVaccine(newVaccine);
    } catch (error) {
      console.error("Error al crear vacuna:", error);
      throw error;
    }
  }
}