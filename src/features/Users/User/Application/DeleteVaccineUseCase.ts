// src/Application/Vaccine/DeleteVaccineUseCase.ts
import { VaccineRepository } from "../Domain/VaccineRepository";
import { useAuth } from "../Presentation/Hooks/AuthProvider";

export class DeleteVaccineUseCase {
  private repository = new VaccineRepository();

  async execute(id: number, token: string | null): Promise<boolean> {
    return await this.repository.deleteVaccine(id, token);
  }
}