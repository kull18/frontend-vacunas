import type { SensorCheckDataValues } from "../Domain/SensorCheckDataValues"
import { SensorCheckRepostory } from "../Domain/SensorCheckRepository"

export class GetSensorCheckUseCase {
    private repository: SensorCheckRepostory

    constructor() {
        this.repository = new SensorCheckRepostory()
    }

    async execute(): Promise<SensorCheckDataValues> {
        return this.repository.getSensorCheckData()
    }
}