import { useState } from "react";
import type { BoxVaccine } from "../../Domain/BoxVaccine";
import { UpdateBoxUseCase } from "../../Application/UpdateBoxUseCase";

interface UseUpdateBoxResult {
    updateBox: (id: number, updatedBox: Partial<BoxVaccine>) => Promise<BoxVaccine>;
    updatedBox: BoxVaccine | null;
    loading: boolean;
    error: string | null;
    success: boolean;
    reset: () => void;
}

export const useUpdateBox = (): UseUpdateBoxResult => {
    const [updatedBox, setUpdatedBox] = useState<BoxVaccine | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const reset = () => {
        setUpdatedBox(null);
        setError(null);
        setSuccess(false);
    };

    const updateBox = async (
        id: number, 
        updatedBox: Partial<BoxVaccine>
    ): Promise<BoxVaccine> => {
        setLoading(true);
        reset();

        try {
            const useCase = new UpdateBoxUseCase();
            const result = await useCase.execute(id, updatedBox);
            setUpdatedBox(result);
            setSuccess(true);
            return result;
        } catch (err) {
            const message = err instanceof Error 
                ? err.message 
                : "Error desconocido al actualizar la caja";
            setError(message);
            setSuccess(false);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { 
        updateBox, 
        updatedBox, 
        loading, 
        error, 
        success,
        reset 
    };
};