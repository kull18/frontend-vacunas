import type { UserCivil } from "../Domain/UserCIvil";
import { UserCivilRepository } from "../Domain/UserCivilRepository";

export class UpdateUserCivilUseCase {
    private userCivilRepository: UserCivilRepository
  constructor() {
    this.userCivilRepository = new UserCivilRepository()
  }

  async execute(id: number, updatedData: Partial<UserCivil>, token: string | null): Promise<UserCivil> {
    return await this.userCivilRepository.update(id, updatedData, token);
  }
}
