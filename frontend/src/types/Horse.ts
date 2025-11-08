// src/types/Horse.ts
import { Tracking } from "./Tracking";
export interface NamedEntity {
  id: number;
  name: string;
}

export interface Manufacturer extends NamedEntity {}

export interface Mold extends NamedEntity {
  manufacturer: Manufacturer;
}

export interface RunType extends NamedEntity {}

export interface Finish extends NamedEntity {}

export interface Scale extends NamedEntity {}

export interface Model extends NamedEntity {
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
  breed: NamedEntity;
  breedType: NamedEntity;
  color: NamedEntity;
  pattern: NamedEntity;
  gender: NamedEntity;
  condition: NamedEntity;
  location: NamedEntity;
  tracking: Tracking;
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
