export interface Brigade {
    idBrigade?: number,
    referenceBrigade: string,
    startDate: string,
    endDate: string,
    idLocation?: 0,
    locations: string[]
}

export interface BrigadeLocation {
    idLocation: number,
    location: string
}

export interface BrigadeById {
    idBrigade?: number,
    referenceBrigade: string,
    startDate: string,
    endDate: string,
    locations: BrigadeLocation[]
}