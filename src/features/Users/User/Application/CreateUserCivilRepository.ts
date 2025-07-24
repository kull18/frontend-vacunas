import type { UserCivil } from "../Domain/UserCIvil";
import { UserCivilRepository } from "../Domain/UserCivilRepository";

export class CreateUserCivilUseCase {
    private userCivilRepository: UserCivilRepository
  constructor() {
    this.userCivilRepository = new UserCivilRepository()
  }

  async execute(newUser: UserCivil, token: string | null): Promise<UserCivil> {
    return await this.userCivilRepository.create(newUser, token);
  }
}
