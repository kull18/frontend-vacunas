import { useState } from "react";
import { CreateVaccineUseCase } from "../../Application/CreateVaccine";
import type { Vaccine } from "../../Domain/Vaccine";
import { useAuth } from "./AuthProvider";

export function useCreateVaccine() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [createdVaccine, setCreatedVaccine] = useState<Vaccine | null>(null);
    const { token } = useAuth()

    const createVaccine = async (newVaccine: Vaccine) => {
        
        setLoading(true);
        setError(null);
        try {
            const useCase = new CreateVaccineUseCase();
            const result = await useCase.execute(newVaccine, token);
            console.log("result", result)
            setCreatedVaccine(result);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return { createVaccine, loading, error, createdVaccine };
}
