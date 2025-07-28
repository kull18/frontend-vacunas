import type { Brigade } from "../Domain/Brigades";
import { BrigadesRepository } from "../Domain/BrigadesRepository";

export class CreateBrigadeUseCase {
    private brigadesRepository: BrigadesRepository;

    constructor(brigadesRepository: BrigadesRepository) {
        this.brigadesRepository = brigadesRepository;
    }

    async execute(brigadeData: Omit<Brigade, 'id'>): Promise<Brigade> {
        // Input validation
        if (!brigadeData.referenceBrigade || !brigadeData.locations) {
            throw new Error("Name and location are required");
        }

        try {
            const createdBrigade = await this.brigadesRepository.createBrigades(brigadeData);
            return createdBrigade;
        } catch (error) {
            const errorMessage = error instanceof Error 
                ? error.message 
                : "An unknown error occurred while creating the brigade";
            
            console.error(`[CreateGroupUseCase] Error: ${errorMessage}`);
            throw new Error(`Could not create brigade: ${errorMessage}`);
        }
    }
}