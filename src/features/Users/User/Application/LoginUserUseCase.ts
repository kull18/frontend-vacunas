import type { User, UserLogin } from "../Domain/User";
import { UserRepository } from "../Domain/UserRepository";

export class LoginUserUseCase {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(newUser: UserLogin): Promise<{ token: string; body: User }> {
        try {
            const authResponse = await this.userRepository.loginUser(newUser);

            console.log("Token desde UseCase:", authResponse.token);
            console.log("Body desde UseCase:", authResponse.body);

            return authResponse;

        } catch (error) {
            console.error("Error al iniciar sesión, app:", error);
            throw error;
        }
    }
}