import type { Vaccine } from "../Domain/Vaccine";
import { VaccineRepository } from "../Domain/VaccineRepository";

export class UpdateVaccineUseCase {
  private vaccineRepository = new VaccineRepository();

  async execute(id: number, updated: Partial<Vaccine>): Promise<Vaccine> {
    return await this.vaccineRepository.updateVaccine(id, updated);
  }
}
