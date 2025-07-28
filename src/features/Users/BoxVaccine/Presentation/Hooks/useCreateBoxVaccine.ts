import { useState } from "react";
import type { BoxVaccine } from "../../Domain/BoxVaccine";
import { CreateBoxUseCase } from "../../Application/CreateBoxVaccine";

interface UseCreateBoxResult {
    createBox: (newBox: BoxVaccine) => Promise<BoxVaccine>;
    createdBox: BoxVaccine | null;
    loading: boolean;
    error: string | null;
    reset: () => void;
}

export const useCreateBox = (): UseCreateBoxResult => {
    const [createdBox, setCreatedBox] = useState<BoxVaccine | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const reset = () => {
        setCreatedBox(null);
        setError(null);
    };

    const createBox = async (newBox: BoxVaccine): Promise<BoxVaccine> => {
        setLoading(true);
        reset();

        try {
            const useCase = new CreateBoxUseCase();
            const result = await useCase.execute(newBox);
            setCreatedBox(result);
            return result;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Error desconocido al crear la caja";
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { createBox, createdBox, loading, error, reset };
};