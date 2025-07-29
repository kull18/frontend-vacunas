import type { User } from "../Domain/User";
import type { UserCivilCompleted } from "../Domain/UserCIvil";
import { UserRepository } from "../Domain/UserRepository";
import { UserCivilRepository } from "../Domain/UserCivilRepository";
export class GetUserUseCase {
    private userRepository: UserRepository;
    private userCivilRepository: UserCivilRepository;

    constructor (){
        this.userRepository = new UserRepository
        this.userCivilRepository = new UserCivilRepository();
    }

    async execute(): Promise<User[]>{
        try{
            const user = await this.userRepository.getUser();
            return user
        }catch{
            console.error("Error fetch users:",Error);
            throw Error;
        }
    }

    async executeCompleted(token: string | null): Promise<UserCivilCompleted[]> {
        try {
            const users = await this.userCivilRepository.getAllCompleted(token);
            return users;
        } catch (error) {
            console.error("Error fetching completed users:", error);
            throw error;
        }
    }

    
}