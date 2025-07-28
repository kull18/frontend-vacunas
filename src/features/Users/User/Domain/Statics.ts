export interface StatisticPoint {
  x: number;
  y: number;
}

export interface Statistics {
  mean: number;
  standarDeviation: number;
  median: number;
  mode: number;
  range: number;
  variance: number;
  points: StatisticPoint[];
}
