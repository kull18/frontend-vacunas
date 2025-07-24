import type { Vaccine } from "../Domain/Vaccine";
import { VaccineRepository } from "../Domain/VaccineRepository";

export class GetVaccinesUseCase {
  private vaccineRepository: VaccineRepository;

  constructor(token: string | null) {
    this.vaccineRepository = new VaccineRepository(token);
  }

  async execute(): Promise<Vaccine[]> {
    return await this.vaccineRepository.getVaccines();
  }
}