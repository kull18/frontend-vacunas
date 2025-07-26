export interface VaccinationRecord {
  date: string; // o Date si ya lo estás manejando como objeto de fecha
  patient: {
    id: number;
    name: string;
    lastname: string;
  };
  medic: {
    id: number;
    name: string;
    lastname: string;
  };
  vaccine: {
    id: number;
    name: string;
  };
}

export interface VaccinationResponse {
  vaccinations: VaccinationRecord[];
  vaccineCounts: Record<string, number>;
}
