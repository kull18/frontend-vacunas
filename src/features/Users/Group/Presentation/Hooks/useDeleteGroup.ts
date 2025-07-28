import { useState } from "react";
import { DeleteGroupUseCase } from "../../Application/DeleteGroupUseCase";
import type { GroupRepository } from "../../Domain/GroupRepository";

export const useDeleteGroup = (repository: GroupRepository) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteGroup = async (groupId: number): Promise<boolean> => {
        setIsDeleting(true);
        setError(null);
        
        try {
            const deleteUseCase = new DeleteGroupUseCase(repository);
            const result = await deleteUseCase.execute(groupId);
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error 
                ? err.message 
                : "Error al eliminar grupo";
            setError(errorMessage);
            return false;
        } finally {
            setIsDeleting(false);
        }
    };

    return { deleteGroup, isDeleting, error };
};