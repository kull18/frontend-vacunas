import { useState } from "react";
import type { Group } from "../../Domain/Group";
import { UpdateGroupUseCase } from "../../Application/UpdateGroupUseCase";
import { GroupRepository } from "../../Domain/GroupRepository";

interface UseUpdateGroupResult {
    updateGroup: (id: number, updatedGroup: Partial<Group>) => Promise<Group>;
    updatedGroup: Group | null;
    loading: boolean;
    error: string | null;
    success: boolean;
    reset: () => void;
}

export const useUpdateGroup = (): UseUpdateGroupResult => {
    const [updatedGroup, setUpdatedGroup] = useState<Group | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const reset = () => {
        setUpdatedGroup(null);
        setError(null);
        setSuccess(false);
    };

    const updateGroup = async (
        id: number, 
        updatedGroup: Partial<Group>
    ): Promise<Group> => {
        setLoading(true);
        reset();

        try {
            const repository = new GroupRepository()
            const useCase = new UpdateGroupUseCase(repository);
            const result = await useCase.execute(id, updatedGroup);
            setUpdatedGroup(result);
            setSuccess(true);
            return result;
        } catch (err) {
            const message = err instanceof Error 
                ? err.message 
                : "Error desconocido al actualizar el grupo";
            setError(message);
            setSuccess(false);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { 
        updateGroup, 
        updatedGroup, 
        loading, 
        error, 
        success,
        reset 
    };
};