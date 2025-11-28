import type { UserRepository } from "../Domain/UserRepository";


export class DeleteUserUseCase {
    private repository: UserRepository

    constructor(repository) {
        this.repository = repository; 
    }

    async execute(id: number): Promise<boolean> {
        return this.repository.deleteUser(id)
    } 
}