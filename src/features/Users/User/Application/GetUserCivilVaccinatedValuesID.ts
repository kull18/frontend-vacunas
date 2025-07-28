import { UserCivilVaccinatedRepository } from "../Domain/UserCivilVaccinatedRepository";
import type { VaccinationResponse } from "../Domain/VaccinationResponse";



export class GetUserCivilVacinatedValuesID {
    private repository: UserCivilVaccinatedRepository
    constructor() {
        this.repository = new UserCivilVaccinatedRepository()
    }

    async execute(id: number): Promise<VaccinationResponse> {
        return this.repository.getUserCivilVaccinatedWithValuesId(id)
    }
}