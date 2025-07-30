import type { UserCivil } from "../Domain/UserCIvil";
import { UserCivilRepository } from "../Domain/UserCivilRepository";

export class UpdateIsVaccinatedCivilUseCase {
  private userCivilRepository: UserCivilRepository;

  constructor() {
    this.userCivilRepository = new UserCivilRepository();
  }

  async execute(id: number): Promise<UserCivil> {
    return await this.userCivilRepository.updateIsVaccinated(id)
  }
}
