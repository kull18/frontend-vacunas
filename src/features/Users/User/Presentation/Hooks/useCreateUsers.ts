import { useEffect, useState } from "react";
import type { User } from "../../Domain/User";
import { CreateUserUseCase } from "../../Application/CreateUserUseCase";

interface PropsCreateUser {
    createUser: (newUser: User) => Promise<void>;
    createdUser: User | null;
    loading: boolean;
    errorCreate: unknown | null;
}

export const useCreateUser = (): PropsCreateUser => {
    const [createdUser, setCreatedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorCreate, setError] = useState<unknown | null>(null);

    const createUser = async (newUser: User): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const uc = new CreateUserUseCase();
            const data = await uc.execute(newUser);
            setCreatedUser(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        createUser,
        createdUser,
        loading,
        errorCreate
    };
};
