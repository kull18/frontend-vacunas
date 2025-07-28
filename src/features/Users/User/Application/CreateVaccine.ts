import type { VaccineName } from "../Domain/Vaccine";
import { VaccineRepository } from "../Domain/VaccineRepository";
import { useAuth } from "../Presentation/Hooks/AuthProvider";

export class CreateVaccinesUseCase {
  private vaccineRepository = new VaccineRepository();

  async execute(newVaccine: VaccineName,token: string | null): Promise<VaccineName> {

    return await this.vaccineRepository.createVaccine(newVaccine,token);
  }
}