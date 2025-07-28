import type { Group } from "../Domain/Group";
import { GroupRepository } from "../Domain/GroupRepository";

export class DeleteGroupUseCase {
    private readonly groupRepository: GroupRepository;

    constructor(groupRepository: GroupRepository) {
        this.groupRepository = groupRepository;
    }

    async execute(id: number): Promise<boolean> {
        if (!id || id <= 0) {
            throw new Error("Invalid group ID");
        }

        try {
            return await this.groupRepository.deleteGroup(id);
        } catch (error) {
            const errorMessage = error instanceof Error 
                ? error.message 
                : "An unknown error occurred while deleting the group";
            throw new Error(`DeleteGroupUseCase: ${errorMessage}`);
        }
    }
}