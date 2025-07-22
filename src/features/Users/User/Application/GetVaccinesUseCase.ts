import type { Vaccine } from "../Domain/Vaccine";
import { VaccineRepository } from "../Domain/VaccineRepository";

export class GetVaccinesUseCase {
  private vaccineRepository = new VaccineRepository();

  async execute(): Promise<Vaccine[]> {
    return await this.vaccineRepository.getVaccines();
  }
}
