import { useState } from "react";
import type { BoxVaccine, BoxVaccineAmount } from "../../Domain/BoxVaccine";
import { CreateBoxUseCase } from "../../Application/CreateBoxVaccine";

interface PropsCreateBox {
    createBox: (newBox: BoxVaccine) => Promise<BoxVaccine>;
    createdBox: BoxVaccine | null;
    loadingBox: boolean;
    error: unknown | null;
}

export const useCreateBox = (): PropsCreateBox => {
    const [createdBox, setCreatedBox] = useState<BoxVaccine | null>(null);
    const [loadingBox, setLoading] = useState(false);
    const [error, setError] = useState<unknown | null>(null);

    const createBox = async (newBox: BoxVaccine): Promise<BoxVaccine> => {
        setLoading(true);
        setError(null);

        try {
            const uc = new CreateBoxUseCase();
            const data = await uc.execute(newBox);
            setCreatedBox(data);
            return data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        createBox,
        createdBox,
        loadingBox,
        error
    };
};
