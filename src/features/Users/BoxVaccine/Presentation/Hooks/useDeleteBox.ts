import { useState } from "react";
import { BoxRepository } from "../../Domain/BoxVaccineRepository";
import { DeleteBoxUseCase } from "../../Application/DeleteBoxUseCase";

interface UseDeleteBoxReturn {
    deleteBox: (id: number) => Promise<boolean>;
    loading: boolean;
    error: string | null;
    success: boolean;
    reset: () => void;
}

export const useDeleteBox = (boxRepository: BoxRepository): UseDeleteBoxReturn => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const reset = () => {
        setError(null);
        setSuccess(false);
    };

    const deleteBox = async (id: number): Promise<boolean> => {
        setLoading(true);
        reset();

        try {
            const deleteUseCase = new DeleteBoxUseCase(boxRepository);
            const result = await deleteUseCase.execute(id);
            setSuccess(result);
            return result;
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Error desconocido al eliminar la caja";
            setError(message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { deleteBox, loading, error, success, reset };
};