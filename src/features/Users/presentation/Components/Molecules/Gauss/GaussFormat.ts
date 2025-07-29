export interface GaussPoint {
  x: number; // Temperatura
  y: number; // Valor de la función de densidad (altura de la curva)
}

export interface GraficResponse {
  mean: number;
  standarDeviation: number;
  median: number;
  mode: number;
  range: number;
  variance: number;
  points: GaussPoint[];
  inputPoint?: GaussPoint | null;
}

export interface TemperatureInput {
  value: number;
}
