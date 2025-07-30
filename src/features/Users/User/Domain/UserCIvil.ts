export interface UserCivil {
    idUserCivil: number;
    fol: string;
    corporalTemperature: number;
    alcoholBreat: number;
    isVaccinated?: number;
    name?: string;
    firstLastname?: string;
    CURP?: string;
    secondLastname?: string;
    dayBirthday?: number;
    monthBirthday?: string;
    yearBirthday?: string;
    yearsOld?: number;
    school?: string;
    schoolGrade?: string;
}

export interface UserCivilCompleted {
    idUserCivil: number;
    fol: string;
    corporalTemperature: number;
    alcoholBreat: number;
    isVaccinatedUser?: number;
    nameUser?: string;
    firstLastname?: string;
    CURP?: string;
    secondLastname?: string;
    dayBirthday?: number;
    monthBirthday?: string;
    yearBirthday?: string;
    yearsOld?: number;
    school?: string;
    schoolGrade?: string;
}
//name, lastname, fol, alcoholBreat, corporalTemperature, isVaccinated, 

//modal enviar datos: folio, alcoholbreat, corporalTemperature
