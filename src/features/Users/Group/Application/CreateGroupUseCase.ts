import type { Group } from "../Domain/Group";
import { GroupRepository } from "../Domain/GroupRepository";

export class CreateGroupUseCase {
    private groupRepository: GroupRepository;
    
    constructor() {
        this.groupRepository = new GroupRepository();
    }

    async execute(newGroup: Omit<Group, 'id'>): Promise<Group> {
        try {
            const createdGroup = await this.groupRepository.createGroup(newGroup);
            return createdGroup;
        } catch (error) {
            console.error("Error creating group:", error);
            throw error; // Propaga el error para manejo superior
        }
    }
}