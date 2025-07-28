import type { UserCivilVaccinated } from "./UserCivilVaccinated";
import type { UserCivilVaccinatedData } from "./UserCivilVaccinatedData"
import type { VaccinationResponse } from "./VaccinationResponse"



export class UserCivilVaccinatedRepository {

async createUserCivilVaccinated(data: UserCivilVaccinated): Promise<UserCivilVaccinated> {
    try {
      const response = await fetch('http://localhost:8001/UserCivilVaccinated', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al registrar vacunación');
      }

      const responseData: UserCivilVaccinated = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  }

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

    async getUserCivilVaccinatedWithValuesId(id: number): Promise<VaccinationResponse> {
        try {
            const response = await fetch(`http://localhost:8001/UserCivilVaccinated/with-values/${id}`)

            if(!response.ok) {
                throw new Error('Error to fetch data')
            }

            const data: VaccinationResponse = await response.json()

            return data           
        }catch(error) {
            throw new Error("Error to fetch data")
        }
    }
}