// GetVaccineAmountUseCase.ts
import type { VaccineVaccineBox } from "../Domain/VaccineVaccineBox";
import { VaccineRepository } from "../Domain/VaccineRepository";

export class GetVaccineAmountUseCase {
  private vaccineRepository: VaccineRepository  
  constructor() {
    this.vaccineRepository = new VaccineRepository()
  }

  async execute(token: string | null): Promise<VaccineVaccineBox[]> {
    return await this.vaccineRepository.getVaccineAmount(token);
  }
}
