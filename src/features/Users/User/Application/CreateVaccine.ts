import type { Vaccine } from "../Domain/Vaccine";
import { VaccineRepository } from "../Domain/VaccineRepository";
import { useAuth } from "../Presentation/Hooks/AuthProvider";

export class CreateVaccinesUseCase {
  private vaccineRepository = new VaccineRepository();

  async execute(newVaccine: Vaccine,token: string | null): Promise<Vaccine> {

    return await this.vaccineRepository.createVaccine(newVaccine,token);
  }
}