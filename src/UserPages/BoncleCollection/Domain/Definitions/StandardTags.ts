import { StringEnum_create } from "../../../../(System)/Data/StringEnum";
import { ExpandType } from "../../../../(System)/Types/Magic";
import { assert } from "../../../../(System)/Assert";

// There is a desire for negative rules
// badGuy -> -goodGuy
// But how do you resolve conflicts? And loops?

export interface BoncleTagTree {
    [s: string] : BoncleTagTree;
}

export type  BoncleTagRoot = typeof BoncleTagRoot;
export const BoncleTagRoot = {
    _displayElements: {
        // Opponent process colors...
        _displayRed  : {},
        _displayBlue : {},
        _displayGreen: {},
        _displayWhite: {},
        _displayGold : {},
        _displayBlack: {},
        _displayNone : {},
    },
    _seasonOfRelease: {
        // Only purpose is to order sets by release
        // winter is default, summer is by mid 
        // ...mid 2002... reads well
        mid: {},
    },
    _yearOfRelease: {
        "2001": {},
        "2002": {},
        "2003": {},
        "2004": {},
        "2005": {},
        "2006": {},
        "2007": {},
        "2008": {},
        "2009": {},
        "2010": {},
        "2015": {},
        "2016": {},
    },
    _sex: {
        male  : {},
        female: {},
    },
    _colored: {
        white : {},
        gray  : {},
        black : {},
        red   : {},
        orange: {},
        tan   : {},
        yellow: {},
        green : {},
        lime  : {},
        cyan  : {},
        blue  : {},
        purple: {},
        shinyColor: {
            gold  : {},
            silver: {},
            bronze: {},
            gunmetal: {},
        },
    },
    _theme: {
        bionicleGen1: {},
        bionicleGen2: {},
    },
    _multiplicity: {
        "1-in-1": {},
        "2-in-1": {},
        "3-in-1": {},
        "4-in-1": {},
        "5-in-1": {},
        "6-in-1": {},
    },
    _elemental: {
        fire     : { ta : {} },
        water    : { ga : {} },
        air      : { le : {} },
        ice      : { ko : {} },
        stone    : { po : {} },
        earth    : { onu: {} },
        light    : { av : {} },
        shadow   : {},
        jungle   : {},
        // wtf were they doing on bara magna
        sand     : {},
        rock     : {}, // for the skrall :?
        iron     : {},
    },
    _sized: {
        small : {},
        medium: {},
        large : {
            titan: {},
        },
        // Whats the difference between large and huge?
        huge  : {},
    },
    special: {
        limitedEdition: {},
        specialEdition: {},
    },
    _location: {
        aquaMagna: {
            mataNui: {},
            voyaNui: {},
            mahriNui: {},
            greatSpiritRobot: {
                metruNui: {},
                kardaNui: {},
            },
        },
        baraMagna: {},
    },
    _species: {
        _matoranUniverseSpecies: {
            // technically toa are a kind of matoran
            toa: {
                toaMata: {},
                toaNuva: {
                    // Technically Phantoka were still normal Nuva, just with new armor
                    // But for all set purposes they could be entirely different people
                },
                toaMetru: {},
                toaHordika: {},
                toaInika: {},
                toaMahri: {},
                toaKarda: {
                    toaPhantoka: {},
                    toaMistika: {},
                },
                toaCordak: {},
                toaMangai: {},
                toaHagah: {},
            },
            turaga: {
                turagaMata: {},
                turagaMetru: {},
            },
            matoran: {
                matoranMata: {},
                matoranNuva: {},
                matoranMetru: {},
                matoranInika: {},
                matoranMahri: {},
                matoranKarda: {
                    matoranOfLight: {},
                    matoranOfShadow: {},
                },
            },
            bohrok: {
                vanillaBohrok: {},
                bohrokKal: {},
            },
            bohrokVa: {},
            makuta: {
                makutaKarda: {
                    makutaPhantoka: {},
                    makutaMistika : {},
                },
            },
            rahkshi: {},
            skakdi: {
                piraka: {},
            },
            steltian: {},
            vortixx: {},
            rahaga: {},
            barraki: {},
            rahi: {
                hydruka: {},
                visorak: {},
            }
        },
        _spherusMagnaSpecies: {
            agori: {
                boneHunter: {},
            },
            glatorian: {
                vanillaGlatorian: {},
                glatorianLegend: {},
            },
            skrall: {},
        },
        _okotoSpecies: {
            okotan: {
                protectorOf: {},
            },
            okoToa: {
                masterOf: {},
                uniterOf: {},
            },
            skullHunter: {},
            creatureOf: {},
        },
    },
    // = occurs more than once
    // Useful to compare different iterations
    _famousPeople: {
        ogToaTeam: {
            tahu  : {},
            gali  : {},
            lewa  : {},
            kopaka: {},
            pohatu: {},
            onua  : {},
        },
        ogTuragaTeam: {
            vakama: {},
            nokama: {},
            matau : {},
            nuju  : {},
            onewa : {},
            whenua: {},
        },
        ogMatoran: {
            ogMatoranTeam: {
                jaller: {},
                hahli : {},
                kongu : {},
                matoro: {},
                hewkii: {},
                nuparu: {},
            },
            kopeke: {},
            macku:  {},
        },
        takanuva:  {},
    },
    _faction: {
        goodGuy: {},
        badGuy : {},
    },
    _uncategorized: {
        animal: {},
        vehicle: {},
        combinerModel: {},
        playset: {},
        allStars: {},
        booster: {
            ammo: {},
        },
    },
} as const satisfies BoncleTagTree;

type AllKeys_StringKeys<T> = keyof T;
type AllKeys_Spread<T>     = T extends any ? AllKeys<T> : never;
type AllKeys<T> = 
    | AllKeys_StringKeys<T>
    | AllKeys_Spread<T[AllKeys_StringKeys<T>]>
;

const whitespace = /\s/;
function simpleCheck(x: string): BoncleTag {
    assert(!whitespace.test(x));
    return x as BoncleTag;
}

const     allKeys   = (root  : BoncleTagTree) => Array.from(allKeys_iter(root));
function *allKeys_iter(branch: BoncleTagTree): Iterable<BoncleTag> {
    let childBranch: BoncleTagTree | undefined;
    for (const key in branch) {
        yield simpleCheck(key);
        if (childBranch = branch[key]) {
            yield* allKeys_iter(childBranch);
        }
    }
}

const isHidden = (s: string) => s.startsWith('_');

export type  BoncleTag = ExpandType<AllKeys<BoncleTagRoot>>;
export const BoncleTag = StringEnum_create(allKeys(BoncleTagRoot)).withMethods(Self => ({
    /** @bound */
    isPublic(self: BoncleTag): boolean {
        return !isHidden(self);
    },
    /** @bound */
    isInternal(self: BoncleTag): boolean {
        return isHidden(self);
    },
}));

console.log(`There are ${BoncleTag.values.length} tags in the database.`);
