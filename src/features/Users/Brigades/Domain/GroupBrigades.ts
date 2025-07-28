export type RawBrigade = {
  idBrigade: number;
  referenceBrigade: string;
  startDate: string;
  endDate: string;
  idLocation: number;
  location: string;
};

export type GroupedBrigade = {
  idBrigade: number;
  referenceBrigade: string;
  startDate: string;
  endDate: string;
  locations: string[];
};

export function groupBrigades(data: RawBrigade[]): GroupedBrigade[] {
  const groupedMap = new Map<number, GroupedBrigade>();

  for (const item of data) {
    if (!groupedMap.has(item.idBrigade)) {
      groupedMap.set(item.idBrigade, {
        idBrigade: item.idBrigade,
        referenceBrigade: item.referenceBrigade,
        startDate: item.startDate,
        endDate: item.endDate,
        locations: [item.location],
      });
    } else {
      groupedMap.get(item.idBrigade)!.locations.push(item.location);
    }
  }

  return Array.from(groupedMap.values());
}
