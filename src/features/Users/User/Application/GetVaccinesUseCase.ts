import type { Vaccine } from "../Domain/Vaccine";
import { VaccineRepository } from "../Domain/VaccineRepository";
import { useAuth } from "../Presentation/Hooks/AuthProvider";

export class GetVaccinesUseCase {
  private vaccineRepository: VaccineRepository;

  constructor(token: string | null) {
    this.vaccineRepository = new VaccineRepository();
    // Si el repository necesita el token, pásalo aquí
  }

  async execute(token: string | null): Promise<Vaccine[]> {
    return await this.vaccineRepository.getVaccines(token);
  }
}