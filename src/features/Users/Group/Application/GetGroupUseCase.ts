import type { Group } from "../Domain/Group";
import { GroupRepository } from "../Domain/GroupRepository";

export class GetGroupUseCase {
    private groupRepository: GroupRepository;
    
        constructor (){
            this.groupRepository = new GroupRepository
        }
    
        async execute(): Promise<Group[]>{
            try{
                const user = await this.groupRepository.getGroup();
                return user
            }catch{
                console.error("Error fetch groups:",Error);
                throw Error;
            }
        }
}