import { CreateGroupUseCase } from "../../Application/CreateGroupUseCase";
import type { Group } from "../../Domain/Group";
import { useState } from "react";

interface PropsCreateGroup {
    createGroup: (newGroup: Omit<Group, 'id'>) => Promise<Group>;
    loadingCreateGroup: boolean;
    errorCreateGroup: unknown | null;
    createdGroup: Group | null;
}

export const useCreateGroup = (): PropsCreateGroup => {
    const [loadingCreateGroup, setLoading] = useState(false);
    const [errorCreateGroup, setError] = useState<unknown | null>(null);
    const [createdGroup, setCreatedGroup] = useState<Group | null>(null);

    const createGroup = async (newGroup: Omit<Group, 'id'>): Promise<Group> => {
        setLoading(true);
        setError(null);
        setCreatedGroup(null);
        
        try {
            const uc = new CreateGroupUseCase();
            const data = await uc.execute(newGroup);
            setCreatedGroup(data);
            return data;
        } catch (err) {
            setError(err);
            throw err; // Propaga el error para que el componente pueda manejarlo
        } finally {
            setLoading(false);
        }
    };

    return {
        createGroup,
        loadingCreateGroup,
        errorCreateGroup,
        createdGroup
    };
};