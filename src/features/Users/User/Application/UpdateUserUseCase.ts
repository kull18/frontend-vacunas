import type { User } from "../Domain/User";
import type { UserRepository } from "../Domain/UserRepository";

export class UpdateUserUseCase {
    private repository: UserRepository

    constructor(repository: UserRepository) {
        this.repository = repository; 
    }

    async execute(id: number, updateUser: Partial<User>) {
        return this.repository.updateUser(id, updateUser)
    }
}