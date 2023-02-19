import { BoncleTagEnum_createShallow, BoncleTagEnum_createDeep, BoncleTagEnum_Member } from "../TagEnum";
import { BoncleTagRoot } from "./TagTree";

const $ = BoncleTagRoot;

///////////////////
// Shallow enums //
///////////////////

// Kind of the feature we are building this whole app for...
export type  BoncleDisplayElement = BoncleTagEnum_Member<typeof BoncleDisplayElement>;
export const BoncleDisplayElement = BoncleTagEnum_createShallow($._displayElements).withDefault("_displayNone");

// Kind of the feature we are building this whole app for...
export type  BoncleSetSize = BoncleTagEnum_Member<typeof BoncleSetSize>;
export const BoncleSetSize = BoncleTagEnum_createShallow($._sized).withDefault("medium");

export type  BoncleTheme = BoncleTagEnum_Member<typeof BoncleTheme>;
export const BoncleTheme = BoncleTagEnum_createShallow($._theme).withDefault("bionicleGen1");

export type  BoncleReleaseYear = BoncleTagEnum_Member<typeof BoncleReleaseYear>;
export const BoncleReleaseYear = BoncleTagEnum_createShallow($._yearOfRelease);

export type  BoncleSex = BoncleTagEnum_Member<typeof BoncleSex>;
export const BoncleSex = BoncleTagEnum_createShallow($._sex);

export type  BoncleElement = BoncleTagEnum_Member<typeof BoncleElement>;
export const BoncleElement = BoncleTagEnum_createShallow($._elemental).withDefault("_noElement");

////////////////
// Deep enums //
////////////////

export type  BoncleSpecies = BoncleTagEnum_Member<typeof BoncleSpecies>;
export const BoncleSpecies = BoncleTagEnum_createDeep($._species).withDefault("unknownSpecies");

export type  BoncleMyOpinion = BoncleTagEnum_Member<typeof BoncleMyOpinion>;
export const BoncleMyOpinion = BoncleTagEnum_createDeep($._opinion).withDefault("whatever");

export type  BoncleMyPossession = BoncleTagEnum_Member<typeof BoncleMyPossession>;
export const BoncleMyPossession = BoncleTagEnum_createDeep($._possession).withDefault("dontHave");
