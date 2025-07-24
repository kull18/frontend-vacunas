import { GetGroupUseCase } from "../../Application/GetGroupUseCase";
import type { Group } from "../../Domain/Group";
import { useEffect, useState } from "react";

interface PropsGetGroup {
    group: Group[];
    loadingGroup: boolean;
    errorGroup: unknown | null;
}

export const useGetGroup = (): PropsGetGroup => {
    const [group, setGroup] = useState<Group[]>([]);
    const [loadingGroup, setLoading] = useState(false);
    const [errorGroup, setError] = useState<unknown | null>(null);

    useEffect(() => {
        setLoading(true);
        const fetchGroup = async () => {
            try {
                const uc = new GetGroupUseCase();
                const data = await uc.execute();
                setGroup(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchGroup();
    }, []);

    return {
        group,
        loadingGroup,
        errorGroup
    };
};
