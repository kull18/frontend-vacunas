import { useState } from "react";
import { DeleteUserCivilUseCase } from "../../Application/DeleteUserCivilRepository";
export const useDeleteUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteUser = async (id: number, token: string | null): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const deleteUseCase = new DeleteUserCivilUseCase();
            const success = await deleteUseCase.execute(id, token);
            
            if (!success) {
                throw new Error('No se recibió confirmación de eliminación');
            }
            
            return true;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error desconocido al eliminar';
            setError(message);
            console.error('Delete failed:', { id, error: err });
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { deleteUser, loading, error };
};