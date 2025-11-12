// src/types/Horse.ts
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
  purchasePrice: number;
  sellPrice: number;
  nanQualified: boolean;
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
  fourthPlace: number;
  fifthPlace: number;
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
  purchasePrice: number;
  sellPrice: number;
  nanQualified: boolean;
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
  fourthPlace: number;
  fifthPlace: number;
  showName: string;
  officePony?: string | null;
}
