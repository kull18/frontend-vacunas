import type { Group } from "../Domain/Group";
import { GroupRepository } from "../Domain/GroupRepository";

export class DeleteGroupUseCase {
    private groupRepository: GroupRepository;

    constructor(groupRepository: GroupRepository) {
        this.groupRepository = groupRepository;
    }

    async execute(id: number): Promise<boolean> {
        if (!id || id <= 0) {
            throw new Error("Invalid group ID");
        }

        try {
            const success = await this.groupRepository.deleteGroup(id);
            
            if (!success) {
                throw new Error("Group deletion failed");
            }

            return true;
        } catch (error) {
            const errorMessage = error instanceof Error 
                ? error.message 
                : "An unknown error occurred while deleting the group";
            throw new Error(`DeleteGroupUseCase: ${errorMessage}`);
        }
    }
}