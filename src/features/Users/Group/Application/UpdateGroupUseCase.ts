import type { Group } from "../Domain/Group";
import { GroupRepository } from "../Domain/GroupRepository";

export class UpdateGroupUseCase {
    private groupRepository: GroupRepository;

    constructor(groupRepository?: GroupRepository) {
        this.groupRepository = groupRepository ?? new GroupRepository();
    }

    async execute(id: number, updatedGroup: Partial<Group>): Promise<Group> {
        // Validaciones
        if (!id || id <= 0) {
            throw new Error("ID de grupo inválido");
        }

        if (!updatedGroup.nameGroup?.trim()) {
            throw new Error("El nombre del grupo no puede estar vacío");
        }

        // Validar longitud del nombre
        if (updatedGroup.nameGroup && updatedGroup.nameGroup.trim().length < 3) {
            throw new Error("El nombre del grupo debe tener al menos 3 caracteres");
        }

        if (updatedGroup.nameGroup && updatedGroup.nameGroup.trim().length > 100) {
            throw new Error("El nombre del grupo no puede exceder 100 caracteres");
        }

        try {
            return await this.groupRepository.updateGroup(id, updatedGroup);
        } catch (error) {
            console.error("Error en UpdateGroupUseCase:", error);
            throw new Error(
                `No se pudo actualizar el grupo: ${
                    error instanceof Error ? error.message : 'Error desconocido'
                }`
            );
        }
    }
}