import { UserCivilVaccinated } from "../Domain/UserCivilVaccinated"

export class GetUserCivilVaccinatedValuesUseCase {
    private uc: UserCivilVaccinated

    constructor() {
        this.uc = new UserCivilVaccinated()
    }

    async execute() {
        try  {
            return await this.uc.getUserCivilVaccinatedValues()
        }catch(error) {
            throw error
        }
    }
}