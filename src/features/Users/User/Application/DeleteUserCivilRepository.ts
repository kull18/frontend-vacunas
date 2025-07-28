import { UserCivilRepository } from "../Domain/UserCivilRepository";

export class DeleteUserCivilUseCase {
    private userCivilRepository: UserCivilRepository
  constructor() {
    this.userCivilRepository = new UserCivilRepository()
  }

  async execute(id: number, token: string | null): Promise<boolean> {
    return await this.userCivilRepository.delete(id, token);
  }
}
