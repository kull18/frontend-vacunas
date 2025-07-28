import { GetGroupUseCase } from "../../Application/GetGroupUseCase";
import type { Group } from "../../Domain/Group";
import { useEffect, useState, useCallback } from "react";

interface PropsGetGroup {
    group: Group[];
    loadingGroup: boolean;
    errorGroup: unknown | null;
    refetch: () => Promise<void>; // Nueva propiedad
}

export const useGetGroup = (): PropsGetGroup => {
    const [group, setGroup] = useState<Group[]>([]);
    const [loadingGroup, setLoading] = useState(false);
    const [errorGroup, setError] = useState<unknown | null>(null);

    // Moved fetch logic to a separate callback
    const fetchGroups = useCallback(async () => {
        setLoading(true);
        try {
            const uc = new GetGroupUseCase();
            const data = await uc.execute();
            setGroup(data);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]);

    return {
        group,
        loadingGroup,
        errorGroup,
        refetch: fetchGroups // Exponemos la función de recarga
    };
};