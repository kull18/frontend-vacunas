import { useEffect, useState } from "react";
import { GetUserUseCase } from "../../Application/GetUserUseCase";
import type { UserCivilCompleted } from "../../Domain/UserCIvil";

interface PropsGetUser {
    users: UserCivilCompleted[];
    loading: boolean;
    error: unknown | null;
    refetch?: () => void; // Añadir opción para recargar datos
}

export const useGetUserCivils = (): PropsGetUser => {
    const [users, setUsers] = useState<UserCivilCompleted[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const uc = new GetUserUseCase();
            const token = localStorage.getItem('token');
            const data = await uc.executeCompleted(token);
            setUsers(data);
            setError(null);
        } catch (err) {
            setError(err);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        users,
        loading,
        error,
        refetch: fetchData // Permitir recargar los datos cuando sea necesario
    };
};