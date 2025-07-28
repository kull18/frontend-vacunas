import type { Statistics } from "../Domain/Statics";
import { SensorCheckRepostory } from "../Domain/SensorCheckRepository";

export async function getStatisticsUseCase(): Promise<Statistics> {
  const repository = new SensorCheckRepostory();
  return await repository.getStatistics();
}
