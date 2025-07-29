import type { GraficResponse } from "../../presentation/Components/Molecules/Gauss/GaussFormat";
import { SensorsVaccineRepository } from "../Domain/SensorsVaccineRepository";

export class CreatePointGaussUseCase {
  private repository: SensorsVaccineRepository;

  constructor() {
    this.repository = new SensorsVaccineRepository();
  }

  async execute(token: string | null, value: number): Promise<GraficResponse> {
    return await this.repository.createPointGauss(token, value);
  }
}
