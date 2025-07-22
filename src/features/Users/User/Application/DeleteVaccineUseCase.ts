// src/Application/Vaccine/DeleteVaccineUseCase.ts
import { VaccineRepository } from "../Domain/VaccineRepository";

export class DeleteVaccineUseCase {
  private repository: VaccineRepository;

  constructor() {
    this.repository = new VaccineRepository()
  }

  async execute(id: number): Promise<boolean> {
    return await this.repository.deleteVaccine(id);
  }
}
