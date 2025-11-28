import type { UserCivil } from "../Domain/User"
import { UserRepository } from "../Domain/UserRepository";

export class GetCivilUsersWithoutAccountUseCase {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async execute(): Promise<UserCivil[]> {
    return this.repository.getCivilUsersWithoutAccount();
  }
}