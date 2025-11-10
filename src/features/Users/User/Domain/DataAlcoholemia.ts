export interface AlcoholDistribution {
  category: string;
  count: number;
  probability: number;
  percentage: number;
}

export interface AlcoholStatistics {
  totalRecords: number;
  average: number;
  minimum: number;
  maximum: number;
  positiveCases: number;
  positiveRate: number;
}

export interface AlcoholData {
  statistics: AlcoholStatistics;
  distribution: AlcoholDistribution[];
}
