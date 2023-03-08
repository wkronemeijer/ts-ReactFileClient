import { Dictionary } from "../../../../(System)/Collections/Dictionary";
import { Member } from "../../../../(System)/Data/Enumeration";
import { abstract } from "../../../../(System)/Errors";
import { capitalize } from "../../../../(System)/Text/Casing";
import { String_unPascalCase } from "../../../../(System)/Text/String";
import { BoncleTagEnum_createShallow, BoncleTagEnum_createDeep, BoncleTagEnum_Member } from "../TagEnum";
import { BoncleTagTree_Root } from "./TagTree";

const _ = BoncleTagTree_Root;

///////////////////
// Shallow enums //
///////////////////

// Kind of the feature we are building this whole app for...
export type  BoncleDisplayElement = BoncleTagEnum_Member<typeof BoncleDisplayElement>;
export const BoncleDisplayElement = BoncleTagEnum_createShallow(_._displayElements).withDefault("_displayNone");

export type  BoncleSetSize = BoncleTagEnum_Member<typeof BoncleSetSize>;
export const BoncleSetSize = BoncleTagEnum_createShallow(_._sized).withDefault("medium");

// Originally to distinguish BIONICLE from HeroFactory...now I suppose we could give them a different look in the css?
export type  BoncleGeneration = BoncleTagEnum_Member<typeof BoncleGeneration>;
export const BoncleGeneration = BoncleTagEnum_createShallow(_._theme).withDefault("gen1");

export type  BoncleWholeYear = BoncleTagEnum_Member<typeof BoncleWholeYear>;
export const BoncleWholeYear = BoncleTagEnum_createShallow(_._yearOfRelease).withDefault("2001");

export type  BoncleSex = BoncleTagEnum_Member<typeof BoncleSex>;
export const BoncleSex = BoncleTagEnum_createShallow(_._sex);

export type  BoncleElement = BoncleTagEnum_Member<typeof BoncleElement>;
export const BoncleElement = BoncleTagEnum_createShallow(_._elemental).withDefault("_noElement");

////////////////
// Deep enums //
////////////////

export type  BoncleMyOpinion = BoncleTagEnum_Member<typeof BoncleMyOpinion>;
export const BoncleMyOpinion = BoncleTagEnum_createDeep(_._opinion).withDefault("whatever");

export type  BoncleMyPossession = BoncleTagEnum_Member<typeof BoncleMyPossession>;
export const BoncleMyPossession = BoncleTagEnum_createDeep(_._possession).withDefault("dontHave");

export type  BoncleFluency = BoncleTagEnum_Member<typeof BoncleFluency>;
export const BoncleFluency = BoncleTagEnum_createDeep(_._fluent);

/////////////
// Species //
/////////////

export type  BoncleSpecies = BoncleTagEnum_Member<typeof BoncleSpecies>;
export const BoncleSpecies = BoncleTagEnum_createDeep(_._species).withDefault("unknownSpecies").extend(Self => ({
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
    
    creatureOf: "Creature",
    beastOf: "Beast",
    protectorOf: "Protector",
    masterOf: "Master",
    uniterOf: "Uniter",
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
