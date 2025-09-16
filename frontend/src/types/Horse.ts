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
