// For sending (create/update horse)
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

// For receiving (fetch horse)
export interface Horse {
id: number;
tagged: boolean;
manufacturer: Manufacturer;
mold: Mold;
scale: Scale;
model: Model;
breed: Breed;
breedType: BreedType;
color: Color;
pattern: Pattern;
gender: Gender;
condition: Condition;
location: Location;
tracking: Tracking;
showName: string;
officePony?: string | null;
}
