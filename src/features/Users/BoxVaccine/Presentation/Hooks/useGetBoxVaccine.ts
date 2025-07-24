import { GetBoxUseCase } from "../../Application/GetBoxVaccineUseCase";
import type { BoxVaccine } from "../../Domain/BoxVaccine";
import { useEffect, useState } from "react";

interface PropsGetBox {
    box: BoxVaccine[];
    loadingBox: boolean;
    errorBox: unknown | null;
}

export const useGetBox = (): PropsGetBox => {
    const [box, setGroup] = useState<BoxVaccine[]>([]);
    const [loadingBox, setLoading] = useState(false);
    const [errorBox, setError] = useState<unknown | null>(null);

    useEffect(() => {
        setLoading(true);
        const fetchGroup = async () => {
            try {
                const uc = new GetBoxUseCase();
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
        box,
        loadingBox,
        errorBox
    };
};
