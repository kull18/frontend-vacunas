// Application/GetPatientVaccinesUseCase.ts
import { UserCivilVaccinatedRepository, type PatientVaccinesResponse } from "../Domain/UserCivilVaccinatedRepository";

export class GetPatientVaccinesUseCase {
    private repository: UserCivilVaccinatedRepository;

    constructor() {
        this.repository = new UserCivilVaccinatedRepository();
    }

    async execute(patientId: number): Promise<PatientVaccinesResponse> {
        if (!patientId || patientId <= 0) {
            throw new Error('ID de paciente inválido');
        }

        return await this.repository.getPatientVaccines(patientId);
    }
}