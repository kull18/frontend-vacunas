// src/Application/Vaccine/CreateVaccineUseCase.ts
import type { Vaccine } from "../Domain/Vaccine";
import { VaccineRepository } from "../Domain/VaccineRepository";

export class CreateVaccineUseCase {
    private vaccineRepository: VaccineRepository

    constructor() {
        this.vaccineRepository = new VaccineRepository()
    }

    async execute(newVaccine: Vaccine, token: string | null): Promise<Vaccine> {
        if (!token) {
            throw new Error("Authentication token is required");
        }

        try {
            return await this.vaccineRepository.createVaccine(newVaccine, token);
        } catch (error) {
            console.error("Error creating vaccine:", error);
            throw error;
        }
    }
}