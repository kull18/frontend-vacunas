import type { Vaccine } from "../Domain/Vaccine";
import { VaccineRepository } from "../Domain/VaccineRepository";

export class UpdateVaccineUseCase {
  private vaccineRepository = new VaccineRepository();

  async execute(id: number, data: Partial<Vaccine>, token: string | null): Promise<Vaccine> {
    return await this.vaccineRepository.updateVaccine(id, data, token);
  }
}