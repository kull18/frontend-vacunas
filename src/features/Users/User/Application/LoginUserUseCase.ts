import type { User, UserLogin } from "../Domain/User";
import { UserRepository } from "../Domain/UserRepository";

interface LoginError {
  type: 'invalid_credentials' | 'network_error' | 'server_error' | 'unknown'; // ← Actualizado
  message: string;
}

export class LoginUserUseCase {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    async execute(credentials: UserLogin): Promise<{ token: string; body: User }> {
        try {
            console.log("🔄 UseCase: Intentando login...");
            const authResponse = await this.repository.loginUser(credentials);
            
            console.log("✅ UseCase: Login exitoso");
            return authResponse;

        } catch (error: any) {
            console.error("❌ UseCase: Error capturado:", error);
            throw error as LoginError;
        }
    }
}