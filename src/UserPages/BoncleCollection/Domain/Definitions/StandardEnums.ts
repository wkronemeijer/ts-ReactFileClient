import { String_unPascalCase } from "../../../../(System)/Text/String";
import { Dictionary } from "../../../../(System)/Collections/Dictionary";
import { capitalize } from "../../../../(System)/Text/Casing";
import { abstract } from "../../../../(System)/Errors";
import { Member } from "../../../../(System)/Data/Enumeration";

import { BoncleTagEnum_createShallow, BoncleTagEnum_createDeep, BoncleTagEnum_Member } from "../TagEnum";
import { BoncleTagTree_Root } from "./TagTree";
import { Record_toFunction } from "../../../../(System)/Collections/Record";

const $ = BoncleTagTree_Root;

///////////////////
// Shallow enums //
///////////////////

// Kind of the feature we are building this whole app for...
export type  BoncleDisplayElement = BoncleTagEnum_Member<typeof BoncleDisplayElement>;
export const BoncleDisplayElement = 
    BoncleTagEnum_createShallow($.$displayElements)
    .withDefault("_displayNone");

export type  BoncleSetSize = BoncleTagEnum_Member<typeof BoncleSetSize>;
export const BoncleSetSize = 
    BoncleTagEnum_createShallow($.$sized)
    .withDefault("medium");

export type  BoncleWholeYear = BoncleTagEnum_Member<typeof BoncleWholeYear>;
export const BoncleWholeYear = 
    BoncleTagEnum_createShallow($.$yearOfRelease)
    .withDefault("2001");

export type  BoncleRating = BoncleTagEnum_Member<typeof BoncleRating>;
export const BoncleRating = 
    BoncleTagEnum_createShallow($.$rating)
    .withDefault("5");

const star = "⭐";
const starsByRating: Record<BoncleRating, string> = {
    "0" : star.repeat(1),
    "1" : star.repeat(1),
    "2" : star.repeat(1),
    "3" : star.repeat(2),
    "4" : star.repeat(2),
    "5" : star.repeat(3),
    "6" : star.repeat(3),
    "7" : star.repeat(4),
    "8" : star.repeat(4),
    "9" : star.repeat(5),
    "10": star.repeat(5),
};
// Theoretically we can parse the rating and use it as a number
// But this is more durable if we ever switch to star ratings in the code.

export const BoncleRating_toStars = Record_toFunction(starsByRating);

/////////////
// Species //
/////////////

export type  BoncleSpecies = BoncleTagEnum_Member<typeof BoncleSpecies>;
export const BoncleSpecies = 
    BoncleTagEnum_createDeep($.$species)
    .withDefault("unknownSpecies")
    .extend(Self => ({
        getTitle(self: Member<typeof Self>): string {
            abstract();
        },
    }));

const exceptionalTitleBySpecies: Dictionary<string> = {
    matoranMata: "Tohunga",
    matoranNuva: "Rebuilt",
    matoranMetru: "Matoran of Metru Nui",
    matoranInika: "Matoran of Voya Nui",
    matoranMahri: "Matoran of Mahri Nui",
    matoranOfLight: "Matoran of Light",
    matoranOfShadow: "Matoran of Shadow",
    
    turagaMata: "Turaga",
    turagaMetru: "Turaga",
    
    creatureOf: "Elemental Creature",
    beastOf: "Beast",
    protectorOf: "Elemental Protector",
    masterOf: "Master of Elements",
    uniterOf: "Uniter of Elements",
} satisfies Partial<Record<BoncleSpecies, string>>;

function getTitle(species: BoncleSpecies): string {
    return exceptionalTitleBySpecies[species] ?? (
        String_unPascalCase(species)
        .split(' ')
        .map(capitalize)
        .join(' ')
    );
}

BoncleSpecies.getTitle = getTitle;
