import { CreateGroupUseCase } from "../../Application/CreateGroupUseCase";
import type { Group } from "../../Domain/Group";
import { useState } from "react";

interface GroupFormData {
    nameGroup: string;
    dateGroup: string;
    idVaccineBox: number;
    idBrigade: number;
}

interface PropsCreateGroup {
    createGroup: (formData: GroupFormData) => Promise<Group>;
    loadingCreateGroup: boolean;
    errorCreateGroup: unknown | null;
    createdGroup: Group | null;
    reset: () => void;
}

export const useCreateGroup = (): PropsCreateGroup => {
    const [loadingCreateGroup, setLoading] = useState(false);
    const [errorCreateGroup, setError] = useState<unknown | null>(null);
    const [createdGroup, setCreatedGroup] = useState<Group | null>(null);

    const createGroup = async (formData: GroupFormData): Promise<Group> => {
        setLoading(true);
        setError(null);
        setCreatedGroup(null);
        
        try {
            const uc = new CreateGroupUseCase();
            const data = await uc.execute(formData);
            setCreatedGroup(data);
            return data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setError(null);
        setCreatedGroup(null);
    };

    return {
        createGroup,
        loadingCreateGroup,
        errorCreateGroup,
        createdGroup,
        reset
    };
};