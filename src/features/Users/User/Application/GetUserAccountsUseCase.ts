import type { User } from "../Domain/User"
import { UserRepository } from "../Domain/UserRepository";

export class GetUserAccountsUseCase {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async execute(): Promise<User[]> {
    return this.repository.getUserAccounts();
  }
}