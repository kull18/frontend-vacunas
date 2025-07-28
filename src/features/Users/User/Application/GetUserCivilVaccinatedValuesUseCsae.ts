import { UserCivilVaccinatedRepository } from "../Domain/UserCivilVaccinatedRepository"
export class GetUserCivilVaccinatedValuesUseCase {
    private uc: UserCivilVaccinatedRepository

    constructor() {
        this.uc = new UserCivilVaccinatedRepository()
    }

    async execute() {
        try  {
            return await this.uc.getUserCivilVaccinatedValues()
        }catch(error) {
            throw error
        }
    }
}