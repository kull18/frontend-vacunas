
export interface UserCivilVaccinatedData {
  date: string; 
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