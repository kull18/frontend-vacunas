// src/Application/Vaccine/DeleteVaccineUseCase.ts
import { VaccineRepository } from "../Domain/VaccineRepository";
import { useAuth } from "../Presentation/Hooks/AuthProvider";

export class DeleteVaccineUseCase {
  private repository: VaccineRepository;

  constructor() {
    this.repository = new VaccineRepository();
  }

  async execute(id: number, token: string | null): Promise<boolean> {
    // Obtener el token actual del contexto de autenticación

    return await this.repository.deleteVaccine(id, token);
  }
}