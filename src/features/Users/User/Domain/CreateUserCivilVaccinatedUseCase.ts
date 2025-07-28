// src/User/Application/UserCivilVaccinatedUseCase.ts

import type { UserCivilVaccinatedData } from "../Domain/UserCivilVaccinatedData";
import type { UserCivilVaccinated } from "./UserCivilVaccinated";
import { UserCivilVaccinatedRepository } from "./UserCivilVaccinatedRepository";

export class CreateUserCivilVaccinatedUseCase {
  private repository: UserCivilVaccinatedRepository;

  constructor() {
    this.repository = new UserCivilVaccinatedRepository();
  }

  async execute(data: UserCivilVaccinated): Promise<UserCivilVaccinated> {
    try {
      const result = await this.repository.createUserCivilVaccinated(data);
      return result;
    } catch (error) {
      throw new Error(`No se pudo registrar la vacunación: ${error}`);
    }
  }

}
