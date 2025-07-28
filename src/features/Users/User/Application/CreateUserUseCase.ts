import type { User } from "../Domain/User";
import { UserRepository } from "../Domain/UserRepository";

export class CreateUserUseCase {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(newUser: User): Promise<User> {
        try {
            const createdUser = await this.userRepository.createUser(newUser);
            return createdUser;
        } catch (error) {
            console.error("Error al crear usuario, app:", error);
            throw error;
        }
    }
}