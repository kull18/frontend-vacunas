import type { AlcoholData } from "../Domain/DataAlcoholemia"
import { VaccineRepository } from "../Domain/VaccineRepository"

export class GetAlcoholemia {
    private repositorie: VaccineRepository

    constructor() {
        this.repositorie = new VaccineRepository()
    }


    async execute(token: string | null): Promise<AlcoholData[]> {
        try {
           return this.repositorie.getAlcoholemiaData(token)
        }catch(error) {
            throw new Error("error to get data")
        }
    }
}