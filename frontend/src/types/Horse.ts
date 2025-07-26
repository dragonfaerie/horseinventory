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

export interface Horse {
  id: number;
  name: string;
  mold: Mold;
  runType: RunType;
  finish: Finish;
  scale: Scale;
}
