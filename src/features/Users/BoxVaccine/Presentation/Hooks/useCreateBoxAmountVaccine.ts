import { useState } from "react";
import type { BoxVaccine, BoxVaccineAmount } from "../../Domain/BoxVaccine";
import { CreateBoxUseCase } from "../../Application/CreateBoxVaccine";
import { CreateBoxAmountUseCase } from "../../Application/CreateBoxAmountVaccine";

interface PropsCreateBox {
    createBoxAmount: (newBox: BoxVaccineAmount) => Promise<BoxVaccineAmount>;
    createdBoxAmount: BoxVaccineAmount | null;
    loadingBoxAmount: boolean;
    error: unknown | null;
}

export const useCreateBoxAmount = (): PropsCreateBox => {
    const [createdBoxAmount, setCreatedBox] = useState<BoxVaccineAmount | null>(null);
    const [loadingBoxAmount, setLoading] = useState(false);
    const [error, setError] = useState<unknown | null>(null);

    const createBoxAmount = async (newBox: BoxVaccineAmount): Promise<BoxVaccineAmount> => {
        setLoading(true);
        setError(null);

        try {
            const uc = new CreateBoxAmountUseCase();
            const data = await uc.execute(newBox);
            setCreatedBox(data);
            return data;
        } catch (err) {
            setError(err);
            throw err; // Esto corrige el error de tipo
        } finally {
            setLoading(false);
        }
    };

    return {
        createBoxAmount,
        createdBoxAmount,
        loadingBoxAmount,
        error
    };
}