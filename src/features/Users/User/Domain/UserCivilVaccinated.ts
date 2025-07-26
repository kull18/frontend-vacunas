import type { UserCivilVaccinatedData } from "./UserCivilVaccinatedData"
import type { VaccinationResponse } from "./VaccinationResponse"



export class UserCivilVaccinated {



    async getUserCivilVaccinatedValues(): Promise<VaccinationResponse> {
        try {
            const response = await fetch('http://localhost:8001/UserCivilVaccinated/with-values')

            if(!response.ok) {
                throw new Error('Error to fetch data')
            }

            const data: VaccinationResponse = await response.json()

            return data
        }catch(error) {
            throw error
        }
    }
}