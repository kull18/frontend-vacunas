import type { Hospital } from "../Domain/Hospital";
import { HospitalRepository } from "../Domain/HospitalsRepository";

export class GetHospitalsUseCase {
  private hospitalRepository: HospitalRepository;

  constructor() {
    this.hospitalRepository = new HospitalRepository();
  }

  async execute(token: string | null): Promise<Hospital[]> {
    return await this.hospitalRepository.getAll(token);
  }
}
