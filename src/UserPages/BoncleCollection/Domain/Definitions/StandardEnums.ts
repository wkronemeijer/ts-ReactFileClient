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
