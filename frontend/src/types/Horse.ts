// src/types/Horse.ts
export interface Manufacturer {
  id: number;
  name: string;
}
export interface Mold {
  id: number;
  name: string;
  manufacturer: Manufacturer;
}
export interface RunType {
  id: number;
  name: string;
}
export interface Finish {
  id: number;
  name: string;
}
export interface Scale {
  id: number;
  name: string;
}
// add other “minors” similarly…

export interface Model {
  id: number;
  name: string;
  mold: Mold;
  runType: RunType;
  finish: Finish;
  scale: Scale;
}

export interface Horse {
  id: number;
  showName: string;
  tagged: boolean;
  manufacturer: Manufacturer;
  mold: Mold;
  scale: Scale;
  model: Model;
  // breed, breedType, color, pattern, gender, condition, location, tracking...
  officePony?: string | null;
}

export interface HorseRequest {
  tagged: boolean;
  manufacturerId: number;
  moldId: number;
  scaleId: number;
  modelId: number;
  breedId: number;
  breedTypeId: number;
  colorId: number;
  patternId: number;
  genderId: number;
  conditionId: number;
  locationId: number;
  trackingId: number;
  showName: string;
  officePony?: string | null;
}
