import { Mold } from "./Mold";
import { RunType } from "./RunType";
import { Finish } from "./Finish";
import { Scale } from "./Scale";

export interface Model {
  id: number;
  name: string;
  mold: Mold;
  runType: RunType;
  finish: Finish;
  scale: Scale;
}
