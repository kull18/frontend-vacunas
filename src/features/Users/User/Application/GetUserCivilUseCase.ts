import type { UserCivil } from "../Domain/UserCIvil";
import { UserCivilRepository } from "../Domain/UserCivilRepository";

export class GetUserCivilsUseCase {
    private userCivilRepository: UserCivilRepository
  constructor() {
    this.userCivilRepository = new UserCivilRepository()
  }

  async execute(token: string | null): Promise<UserCivil[]> {
    return await this.userCivilRepository.getAll(token);
  }
}
