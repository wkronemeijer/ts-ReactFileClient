import { StringEnum_create, StringEnum_Member } from "../../../(System)/Data/StringEnum";
import { BoncleTagRoot } from "./Definitions/StandardTags";

const $ = BoncleTagRoot;

// Kind of the feature we are building this whole app for...
export type  BoncleDisplayElement = StringEnum_Member<typeof BoncleDisplayElement>;
export const BoncleDisplayElement = StringEnum_create($._displayElements);

// Kind of the feature we are building this whole app for...
export type  BoncleSetSize = StringEnum_Member<typeof BoncleSetSize>;
export const BoncleSetSize = StringEnum_create($._sized);

export type  BoncleTheme = StringEnum_Member<typeof BoncleTheme>;
export const BoncleTheme = StringEnum_create($._theme);

export type  BoncleReleaseSeason = StringEnum_Member<typeof BoncleReleaseSeason>;
export const BoncleReleaseSeason = StringEnum_create($._seasonOfRelease);

export type  BoncleReleaseYear = StringEnum_Member<typeof BoncleReleaseYear>;
export const BoncleReleaseYear = StringEnum_create($._yearOfRelease);
