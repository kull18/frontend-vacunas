import type { User } from "../Domain/User";
import { UserRepository } from "../Domain/UserRepository";

export class GetUserUseCase {
    private userRepository: UserRepository;

    constructor (){
        this.userRepository = new UserRepository
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
}