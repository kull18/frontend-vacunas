import type { GraficResponse } from "../../presentation/Components/Molecules/Gauss/GaussFormat";
import { SensorsVaccineRepository } from "../Domain/SensorsVaccineRepository";

export class GetGaussCurveUseCase {
  private repository: SensorsVaccineRepository;

  constructor() {
    this.repository = new  SensorsVaccineRepository();
  }

  async execute(token: string | null): Promise<GraficResponse> {
    return this.repository.getPointInGauss(token);
  }
}
