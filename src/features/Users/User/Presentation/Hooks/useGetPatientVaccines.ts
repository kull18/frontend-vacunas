// Presentation/Hooks/useGetPatientVaccines.ts
import { useState, useEffect } from "react";
import { GetPatientVaccinesUseCase } from "../../Application/GetPatientVaccinesUseCase";
import type { PatientVaccinesResponse } from "../../Domain/UserCivilVaccinatedRepository";

export const useGetPatientVaccines = (patientId: number | null) => {
    const [data, setData] = useState<PatientVaccinesResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPatientVaccines = async () => {
        if (!patientId) {
            setData(null);
            setError(null);
            return;
        }

        console.log('🔄 Fetching vaccines for patient:', patientId);
        setLoading(true);
        setError(null);

        try {
            const useCase = new GetPatientVaccinesUseCase();
            const result = await useCase.execute(patientId);
            console.log('✅ Vaccines fetched successfully:', result);
            setData(result);
            setError(null);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error desconocido al obtener vacunas';
            console.error('❌ Error fetching patient vaccines:', { 
                patientId, 
                error: err,
                message 
            });
            setError(message);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatientVaccines();
    }, [patientId]);

    const refetch = () => {
        console.log('🔄 Manual refetch triggered for patient:', patientId);
        fetchPatientVaccines();
    };

    return { 
        data, 
        loading, 
        error, 
        refetch,
        hasVaccinations: data?.summary.hasVaccinations ?? false,
        totalVaccinations: data?.totalVaccinations ?? 0
    };
};