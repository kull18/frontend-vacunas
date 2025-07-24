import type { Vaccine } from "../Domain/Vaccine";
import { VaccineRepository } from "../Domain/VaccineRepository";
import { useAuth } from "../Presentation/Hooks/AuthProvider";

export class GetVaccinesUseCase {
  private vaccineRepository: VaccineRepository;

  constructor() {
    this.vaccineRepository = new VaccineRepository();
  }

  async execute(token: string | null): Promise<Vaccine[]> {

    return await this.vaccineRepository.getVaccines(token);
  }
}